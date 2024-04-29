import { Injectable } from '@nestjs/common';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { CreateCalculateDto } from './dto/create-calculate.dto';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
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
      createPersonDto.stripID,
      {
        first_name: createPersonDto.first_name,
        last_name: createPersonDto.last_name,
        relationship: {
          representative: true,
          title: createPersonDto.title,
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
    let payFormat = calculateMoney(km, valueKm).toFixed(2);
    let pay = payFormat.replace(/\./g, '').toString();
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

  async updateWallet(id: string, updateWalletDto: UpdateWalletDto) {
    const date = new Date(); // Cria um novo objeto Date com a data e hora atuais
    const timestamp = Math.floor(date.getTime() / 1000); 
    
    const account = await stripe.accounts.update(
      id,
      {
        business_profile: {
          mcc: updateWalletDto.mcc,
          url: updateWalletDto.url,
        },
        capabilities: {
          transfers: {
            requested: true,
          },
        },
        business_type: 'individual',
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
        dob: {
          day: updatePerson.day,
          month: updatePerson.month,
          year: updatePerson.year,
        },
        ssn_last_4: updatePerson.ssn_last_4,
        phone: updatePerson.phone,
        email: updatePerson.email,
        id_number: updatePerson.id_number,
        relationship: {
          executive: true,
        },
      }
    );
    return person
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

  async findBalance(id:string){
    const balance = await stripe.balance.retrieve({
      stripeAccount: id,
    });
    return balance
  }

  async remove(id: number) {
    const deleted = await stripe.accounts.del(id);
    return deleted
  }
}
