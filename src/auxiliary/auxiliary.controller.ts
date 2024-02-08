import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuxiliaryService } from './auxiliary.service';
import { CreateAuxiliaryDto } from './dto/create-auxiliary.dto';
import { UpdateStatus } from './dto/update-status-driver.dto';
import { UpdateCnh } from './dto/update-cnh-auxiliary.dto';
import { UpdateCpf } from './dto/update-cpf-auxiliary.dto';

@Controller('auxiliary')
export class AuxiliaryController {
  constructor(private readonly auxiliaryService: AuxiliaryService) {}

  @Post()
  create(@Body() createAuxiliaryDto: CreateAuxiliaryDto) {
    return this.auxiliaryService.create(createAuxiliaryDto);
  }

  @Get()
  findAll() {
    return this.auxiliaryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.auxiliaryService.findOne(+id);
  }

  @Post('cnh')
  updateCnh(@Body() updateCnh: UpdateCnh) {
    return this.auxiliaryService.updateCnh(updateCnh);
  }

  @Post('cpf')
  updateCpf(@Body() updateCpf: UpdateCpf) {
    return this.auxiliaryService.updateCpf(updateCpf);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.auxiliaryService.remove(+id);
  }
}
