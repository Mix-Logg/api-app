import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PaymentDeliveryService } from './payment_delivery.service';
import { CreatePaymentDeliveryDto } from './dto/create-payment_delivery.dto';
import { UpdatePaymentDeliveryDto } from './dto/update-payment_delivery.dto';

@Controller('payment-delivery')
export class PaymentDeliveryController {
  constructor(private readonly paymentDeliveryService: PaymentDeliveryService) {}

  @Post()
  create(@Body() createPaymentDeliveryDto: CreatePaymentDeliveryDto) {
    return this.paymentDeliveryService.create(createPaymentDeliveryDto);
  }

  @Get(':id')
  findAll(@Param('id') id_admin: number) {
    return this.paymentDeliveryService.findAll(id_admin);
  }

  @Get('one/:id')
  findOne(@Param('id') id: string) {
    return this.paymentDeliveryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePaymentDeliveryDto: UpdatePaymentDeliveryDto) {
    return this.paymentDeliveryService.update(+id, updatePaymentDeliveryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paymentDeliveryService.remove(+id);
  }
}
