import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CadasterCompanyService } from './cadaster_company.service';
import { CreateCadasterCompanyDto } from './dto/create-cadaster_company.dto';
import { UpdateCadasterCompanyDto } from './dto/update-cadaster_company.dto';

@Controller('cadaster-company')
export class CadasterCompanyController {
  constructor(private readonly cadasterCompanyService: CadasterCompanyService) {}

  @Post()
  create(@Body() createCadasterCompanyDto: CreateCadasterCompanyDto) {
    return this.cadasterCompanyService.create(createCadasterCompanyDto);
  }

  @Get()
  findAll() {
    return this.cadasterCompanyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cadasterCompanyService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCadasterCompanyDto: UpdateCadasterCompanyDto) {
    return this.cadasterCompanyService.update(+id, updateCadasterCompanyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cadasterCompanyService.remove(+id);
  }
}
