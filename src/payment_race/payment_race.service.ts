import { Inject, Injectable } from '@nestjs/common';
import { CreatePaymentRaceDto } from './dto/create-payment_race.dto';
import { UpdatePaymentRaceDto } from './dto/update-payment_race.dto';
import { PaymentRace } from './entities/payment_race.entity';
import { Repository } from 'typeorm';
import { CreateCalculateDto } from './dto/create-calculate.dto';
import * as bcrypt from 'bcrypt';
import findTimeSP from 'hooks/time';
@Injectable()
export class PaymentRaceService {

  constructor(
    @Inject('PAYMENTRACE_REPOSITORY')
    private readonly paymentRace: Repository<PaymentRace>,
  ) {}
  
  async create(createPaymentRaceDto: CreatePaymentRaceDto) {
    const saltOrRounds = 10;
    const timeCurrent = findTimeSP();
    const id_payment = await bcrypt.hash(timeCurrent, saltOrRounds);
    createPaymentRaceDto.id        = `payment-${id_payment}`;
    createPaymentRaceDto.create_at = timeCurrent;
    const response = await this.paymentRace.save(createPaymentRaceDto);
    if(response != null){
      return {
        status:201,
        message:'Successfully created payment race',
        id:response.id,
      }
    }
    return {
      status: 500,
      message:'Server error'
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

  async findAll() {
    return `This action returns all paymentRace`;
  }

  async findOne(id: string) {
    return await this.paymentRace.findOne({where:{id}});
  }

  async update(id: string, updatePaymentRaceDto: UpdatePaymentRaceDto) {
    const response = await this.paymentRace.update(id, updatePaymentRaceDto);
    if(response.affected === 1){
      return {
        status:200,
        message:'Updated paymentRace successfully'
      }
    }
    return {
      status:500,
      message:'Error server internal'
    }
  }

  remove(id: number) {
    return `This action removes a #${id} paymentRace`;
  }
}
