import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PaymentRaceRetrieveService } from './payment_race-retrieve.service';
import { CreatePaymentRaceRetrieveDto } from './dto/create-payment_race-retrieve.dto';
import { UpdatePaymentRaceRetrieveDto } from './dto/update-payment_race-retrieve.dto';

@Controller('payment-race-retrieve')
export class PaymentRaceRetrieveController {
  constructor(private readonly paymentRaceRetrieveService: PaymentRaceRetrieveService) {}

  @Post()
  create(@Body() createPaymentRaceRetrieveDto: CreatePaymentRaceRetrieveDto) {
    return this.paymentRaceRetrieveService.create(createPaymentRaceRetrieveDto);
  }

  @Get()
  findAll() {
    return this.paymentRaceRetrieveService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paymentRaceRetrieveService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePaymentRaceRetrieveDto: UpdatePaymentRaceRetrieveDto) {
    return this.paymentRaceRetrieveService.update(+id, updatePaymentRaceRetrieveDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paymentRaceRetrieveService.remove(+id);
  }
}
