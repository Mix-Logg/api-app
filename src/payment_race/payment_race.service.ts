import { Inject, Injectable } from '@nestjs/common';
import { CreatePaymentRaceDto } from './dto/create-payment_race.dto';
import { UpdatePaymentRaceDto } from './dto/update-payment_race.dto';
import { PaymentRace } from './entities/payment_race.entity';
import { Repository } from 'typeorm';
import { CreateCalculateDto } from './dto/create-calculate.dto';
import { TaxService } from 'src/tax/tax.service';
import * as bcrypt from 'bcrypt';
import findTimeSP from 'hooks/time';
@Injectable()
export class PaymentRaceService {

  constructor(
    @Inject('PAYMENTRACE_REPOSITORY')
    private readonly paymentRace: Repository<PaymentRace>,
    private readonly taxService: TaxService
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
  
  async calculate(createCalculateDto: CreateCalculateDto) {
    const tax = await this.taxService.findAll()
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
    const checkValue = (amount, tax) => {
      switch (createCalculateDto.typeVehicle) {
        case 'motorcycle':
          if(amount < tax[0].motorcycle_min){
            return tax[0].motorcycle_min
          }
          return amount
        case 'tour':
          if(amount < tax[0].tour_min){
            return tax[0].tour_min
          }
          return amount
        case 'util':
          if(amount < tax[0].util_min){
            return tax[0].util_min
          }
          return amount
        case 'van':
          if(amount < tax[0].van_min){
            return tax[0].van_min
          }
          return amount
        case 'vuc':
          if(amount < tax[0].vuc_min){
            return tax[0].vuc_min
          }
          return amount
      } 
    }
    let time = formatTime(createCalculateDto.time);
    let km   = formatDistance(createCalculateDto.km);
    let valueKm;
    switch (createCalculateDto.typeVehicle) {
      case 'motorcycle':
        valueKm = tax[0].km_motorcycle;
        break;
      case 'tour':
        valueKm = tax[0].km_tour;
        break;
      case 'util':
        valueKm = tax[0].km_util;
        break;
      case 'van':
        valueKm = tax[0].km_van;
        break;
      case 'vuc':
        valueKm = tax[0].km_vuc;
        break;
    }
    let amount = calculateMoney(km, valueKm);
    let checkAmount = checkValue(amount, tax);
    return {
      time: time,
      km: km,
      pay: checkAmount
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
