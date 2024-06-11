import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { CelCashService } from './cel_cash.service';
import { CreateCelCashDto } from './dto/create-cel_cash.dto';
import { UpdateCelCashDto } from './dto/update-cel_cash.dto';
import { CreateAdvanceCashDto } from './dto/advance-cel_cash.dto';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { CreateToReverseDto } from './dto/create-toReverse.dto';
@Controller('cel-cash')
export class CelCashController {
  constructor(private readonly celCashService: CelCashService) {}

  @Post()
  create(@Body() createCelCashDto: CreateCelCashDto) {
    return this.celCashService.create(createCelCashDto);
  }

  @Post('webhook-galax-pay')
  webhook(@Body() payload: any){
    return this.celCashService.webhook(payload);
  }

  @Post('advance')
  advance(@Body() createAdvanceCashDto: CreateAdvanceCashDto) {
    return this.celCashService.advance(createAdvanceCashDto);
  }

  @Post('payment')
  createPayment(@Body() createPaymentDto: CreatePaymentDto){
    return this.celCashService.createPayment(createPaymentDto);
  }


  @Post('toReverse')
  createReverse(@Body() createToReverseDto: CreateToReverseDto){
    return this.celCashService.toReverse(createToReverseDto);
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
