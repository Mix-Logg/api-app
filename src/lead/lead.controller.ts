import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseInterceptors } from '@nestjs/common';
import { LeadService } from './lead.service';
import { CreateLeadDto } from './dto/create-lead.dto';
import { UpdateLeadDto } from './dto/update-lead.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadLeadDto } from './dto/upload-lead-dto';
import * as excel from 'exceljs';
@Controller('lead')
export class LeadController {
  constructor(private readonly leadService: LeadService) {}

  @Post()
  create(@Body() createLeadDto: CreateLeadDto) {
    return this.leadService.create(createLeadDto);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File, @Body() uploadLeadDto : UploadLeadDto) {
    const workbook = new excel.Workbook();
    await workbook.xlsx.load(file.buffer);
    const worksheet = workbook.getWorksheet(1); 
    const Newleads = [];
    worksheet.eachRow((row, rowNumber) => {
      if (rowNumber !== 1) { 
        Newleads.push(row.values);
      }
    });
    return this.leadService.upload(Newleads, uploadLeadDto)
  }

  @Get()
  findAll() {
    return this.leadService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.leadService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLeadDto: UpdateLeadDto) {
    return this.leadService.update(+id, updateLeadDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.leadService.remove(+id);
  }
}

