import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
const stripe = require("stripe")('sk_test_51OwOuTP7k6khtfqBRRhYSD7KTmf45WjdPz18D5bzm9EOptSg3qotsXgWg8iQAdG2ciihOcxvAQkeLcZyFT4D0pp4001UYwGQfT');
@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}
  


  @Post()
  async create(@Body() createPaymentDto: CreatePaymentDto) {
    const account = await stripe.accounts.create({
      type: 'express',
      country: 'BR',
      email: createPaymentDto.email,
      capabilities: {
        card_payments: {
          requested: true,
        },
        transfers: {
          requested: true,
        },
      },
    });
    return account.id
  }

  @Get()
  findAll() {
    return this.paymentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paymentService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePaymentDto: UpdatePaymentDto) {
    return this.paymentService.update(+id, updatePaymentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paymentService.remove(+id);
  }
}
