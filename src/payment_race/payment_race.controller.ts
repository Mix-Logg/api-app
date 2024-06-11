import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PaymentRaceService } from './payment_race.service';
import { CreatePaymentRaceDto } from './dto/create-payment_race.dto';
import { UpdatePaymentRaceDto } from './dto/update-payment_race.dto';
import { CreateCalculateDto } from './dto/create-calculate.dto';
@Controller('payment-race')
export class PaymentRaceController {
  constructor(private readonly paymentRaceService: PaymentRaceService) {}

  @Post()
  create(@Body() createPaymentRaceDto: CreatePaymentRaceDto) {
    return this.paymentRaceService.create(createPaymentRaceDto);
  }

  @Post('calculate')
  async calculate(@Body() createCalculateDto: CreateCalculateDto){
    return this.paymentRaceService.calculate(createCalculateDto);
  }

  @Get()
  findAll() {
    return this.paymentRaceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paymentRaceService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePaymentRaceDto: UpdatePaymentRaceDto) {
    return this.paymentRaceService.update(+id, updatePaymentRaceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paymentRaceService.remove(+id);
  }
}
