import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { CreateDonateDto } from './dto/create-donate-dto';
import { CreateCalculateDto } from './dto/create-calculate.dto';
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

  @Post('donate')
  async donate(@Body() createDonateDto: CreateDonateDto){
    const customer = await stripe.customers.create();
    const ephemeralKey = await stripe.ephemeralKeys.create(
      {customer: customer.id},
      {apiVersion: '2023-10-16'}
    );
    const paymentIntent = await stripe.paymentIntents.create({
        amount: createDonateDto.amount,
        currency: 'brl',
        automatic_payment_methods: {
          enabled: true,
        },
    });
    return {
        paymentIntent: paymentIntent.client_secret,
        ephemeralKey: ephemeralKey.secret,
        customer: customer.id,
        publishableKey: 'pk_test_51OwOuTP7k6khtfqBhu0z1FFhietGHGtYvA9PT12g6hxszbTMWzpqkaaSEk8HXEm2n1Cgeju9Qz4czWPghjb4nsn300AkNorR4D'
      }
  }

  @Post('calculate')
  async calculate(@Body() createCalculateDto: CreateCalculateDto){
    return this.paymentService.calculate(createCalculateDto);
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
