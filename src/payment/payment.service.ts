import { Injectable } from '@nestjs/common';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { UpdateDonateDto } from './dto/update-donate.dto';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { CreateCalculateDto } from './dto/create-calculate.dto';
import { CreatePersonDto } from './dto/create-person.dto';
import { CreateDonateDto } from './dto/create-donate-dto';
import { CreateTransferDto } from './dto/create-transfer.dto';
const stripe = require("stripe")('sk_test_51OwOuTP7k6khtfqBRRhYSD7KTmf45WjdPz18D5bzm9EOptSg3qotsXgWg8iQAdG2ciihOcxvAQkeLcZyFT4D0pp4001UYwGQfT');
@Injectable()
export class PaymentService {
  async createWallet(createWalletDto: CreateWalletDto) {
    const account = await stripe.accounts.create({
      type: 'express',
      country: 'BR',
      email: createWalletDto.email,
      capabilities: {
        card_payments: {
          requested: true,
        },
        transfers: {
          requested: true,
        },
      },
      business_type: 'individual',
    });
    return account.id
  }

  async createPerson(createPersonDto: CreatePersonDto) {
    const person = await stripe.accounts.createPerson(
      createPersonDto.striperID,
      {
        first_name: createPersonDto.first_name,
        last_name: createPersonDto.last_name,
        email: createPersonDto.email,
        relationship: {
          representative: true,
          title: 'agregado mix',
        },
        dob: {
          day  : createPersonDto.day,
          month: createPersonDto.month,
          year : createPersonDto.year,
        },
        
      }
    );
    return person.id
  }

  async createDonate(createDonateDto:CreateDonateDto){
    const customer = await stripe.customers.create();
    const ephemeralKey = await stripe.ephemeralKeys.create(
      {customer: customer.id},
      {apiVersion: '2023-10-16'}
    );
    const paymentIntent = await stripe.paymentIntents.create({
        amount: createDonateDto.amount,
        currency: 'brl',
        customer: customer.id,
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

  calculate(createCalculateDto: CreateCalculateDto) {
    function formatTime(minutes: number): string {
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = Math.floor(minutes % 60);
      if (hours > 0) {
        return `${hours} horas ${remainingMinutes} minutos`;
      } else {
        return `${remainingMinutes} minutos`;
      }
    }
    function formatDistance(km: any): number {
      const distance = Number(km); // Convertendo para número
      if (isNaN(distance)) {
        throw new Error('Distância inválida'); // Lançar um erro se não for um número válido
      } else {
        return parseFloat(distance.toFixed(2)); // Retornar a distância formatada com duas casas decimais como um número
      }
    }
    function calculateMoney(distancia: number, valorPorKm: number): number {
      return distancia * valorPorKm;
    }
    const maskMoneyBRL = (value) => {
      const amount = (value / 100).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      });
      return amount
    }

    let time = formatTime(createCalculateDto.time);
    let km = formatDistance(createCalculateDto.km);
    let valueKm;
    switch (createCalculateDto.typeVehicle) {
      case 'motorcycle':
        valueKm = 0.5;
        break;
      case 'tour':
        valueKm = 0.75;
        break;
      case 'util':
        valueKm = 1;
        break;
      case 'van':
        valueKm = 1.5;
        break;
      case 'vuc':
        valueKm = 1.9;
        break;
      default:
        break;
    }
    let amount = calculateMoney(km, valueKm).toFixed(2);
    let pay = amount.replace(/\./g, '').toString();
    let payFormat = maskMoneyBRL(pay)
    return {
      time: time,
      km: km,
      pay: pay,
      payFormat: payFormat,
    };
  }

  findAll() {
    return `This action returns all payment`;
  }

  async findOneWallet(id: string) {
    const account = await stripe.accounts.retrieve(id);
    return account
  }

  async linkLoginWallet(id: string) {
    const loginLink = await stripe.accounts.createLoginLink(id);
    return loginLink.url
  }

  async linkRegisterWallet(id: string){
    const accountLink = await stripe.accountLinks.create({
      refresh_url: 'https://example.com/reauth',
      return_url: 'https://example.com/return',
      account: id,
      type: 'account_onboarding',
    });
    return accountLink;
  }

  async updateWallet(id: string, updateWalletDto: UpdateWalletDto) {
    const date = new Date(); // Cria um novo objeto Date com a data e hora atuais
    const timestamp = Math.floor(date.getTime() / 1000); 
    
    const account = await stripe.accounts.update(
      id,
      {
        // business_profile: {
        //   mcc: updateWalletDto.mcc,
        //   url: updateWalletDto.url,
        // },
        // capabilities: {
        //   transfers: {
        //     requested: true,
        //   },
        // },
        // business_type: 'individual',
        // settings: {
        //   payouts: {
        //     debit_negative_balances: false,
        //     schedule: {
        //       delay_days: 7,
        //       interval: 'daily'
        //     }
        //   }
        // }
      }
    );
    return account
  }

  async updatePerson(idWallet: string, idPerson: string, updatePerson: UpdatePersonDto) {
    const person = await stripe.accounts.updatePerson(
      idWallet,
      idPerson,
      {
        address: {
          city: updatePerson.city,
          line1: updatePerson.line1,
          postal_code: updatePerson.postal_code,
          state: updatePerson.state,
        },
        id_number: updatePerson.id_number,
      }
    );
    return person
  }

  async updateDonate(id: string, updateDonate: UpdateDonateDto){
    const paymentIntent = await stripe.paymentIntents.update(
      id,
      {
        transfer_data: {
          destination: updateDonate.destination,
        },
      }
    );
    return paymentIntent
  }

  async transferer(createTransferDto:CreateTransferDto){
    const charge = await stripe.charges.create({
      amount: createTransferDto.amount,
      currency: 'brl',
      source: 'tok_visa',
    });
    const transfer = await stripe.transfers.create({
      amount: createTransferDto.amount,
      currency: 'brl',
      source_transaction: charge.id,
      destination: createTransferDto.destination ,
    });
    return transfer
  }

  async payment(createTransferDto:CreateTransferDto){
    const customer = await stripe.customers.create();
    const paymentIntent = await stripe.paymentIntents.create({
      amount: createTransferDto.amount,
      currency: 'brl',
      customer: customer.id,
      automatic_payment_methods: {
        enabled: true,
      },
      application_fee_amount: 123,
      transfer_data: {
        destination: createTransferDto.destination,
      },
    });
    return paymentIntent
  }

  async updateTransferer(id: string){
    const transfer = await stripe.transfers.update(id, {
      date: Math.floor(Date.now() / 1000) 
    });
  }

  async paymentInstant(id: string){
    const payout = await stripe.payouts.create(
      {
        amount: 490,
        currency: 'brl',
        method: 'instant',
        destination: '{{BANK_ACCOUNT_TOKEN_ID}}',
      },
      {
        stripeAccount: id,
      }
    );
    return payout
  }

  async findBalance(id:string){
    const balance = await stripe.balance.retrieve(
      {
        expand: ['instant_available.net_available'],
      },
      {
        stripeAccount: id,
      }
    );
    return balance
  }

  async findBalanceTransaction(id:string){
    const balanceTransactions = await stripe.balanceTransactions.list({
      limit: 3,
    });
    return balanceTransactions
  }

  async remove(id: number) {
    const deleted = await stripe.accounts.del(id);
    return deleted
  }
}
