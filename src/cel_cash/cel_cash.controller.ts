import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CelCashService } from './cel_cash.service';
import { CreateCelCashDto } from './dto/create-cel_cash.dto';
import { UpdateCelCashDto } from './dto/update-cel_cash.dto';
import { CreateAdvanceCashDto } from './dto/advance-cel_cash.dto';
@Controller('cel-cash')
export class CelCashController {
  constructor(private readonly celCashService: CelCashService) {}

  @Post()
  create(@Body() createCelCashDto: CreateCelCashDto) {
    return this.celCashService.create(createCelCashDto);
  }

  @Post('advance')
  advance(@Body() createAdvanceCashDto: CreateAdvanceCashDto) {
    return this.celCashService.advance(createAdvanceCashDto);
  }

  @Get()
  findAll() {
    return this.celCashService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.celCashService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCelCashDto: UpdateCelCashDto) {
    return this.celCashService.update(+id, updateCelCashDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.celCashService.remove(+id);
  }
}
