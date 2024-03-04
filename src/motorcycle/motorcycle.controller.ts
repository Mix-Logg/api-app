import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MotorcycleService } from './motorcycle.service';
import { CreateMotorcycleDto } from './dto/create-motorcycle.dto';
import { UpdateMotorcycleDto } from './dto/update-motorcycle.dto';
import { getCpf } from './dto/get-motorcycle.dto';

@Controller('motorcycle')
export class MotorcycleController {
  constructor(private readonly motorcycleService: MotorcycleService) {}

  @Post()
  create(@Body() createMotorcycleDto: CreateMotorcycleDto) {
    return this.motorcycleService.create(createMotorcycleDto);
  }

  @Post('verifyCpf')
  verifyCpf(@Body() params: getCpf) {
    return this.motorcycleService.verifyCpf(params.cpf);
  }

  @Get()
  findAll() {
    return this.motorcycleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.motorcycleService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMotorcycleDto: UpdateMotorcycleDto) {
    return this.motorcycleService.update(+id, updateMotorcycleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.motorcycleService.remove(+id);
  }
}
