import { Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { CreateCalculateDto } from './dto/create-calculate.dto';
@Injectable()
export class PaymentService {
  create(createPaymentDto: CreatePaymentDto) {
    return 'This action adds a new payment';
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
    let km   = formatDistance(createCalculateDto.km)
    let valueKm;
    switch (createCalculateDto.typeVehicle) {
      case 'motorcycle':
        valueKm = 0.50
        break;
      case 'tour':
        valueKm = 0.75
        break;
      case 'util':
        valueKm = 1
        break;
      case 'van':
        valueKm = 1.50
        break;
      case 'vuc':
        valueKm = 1.90
        break;
      default:
        break;
    }
    let pay = calculateMoney(km, valueKm).toFixed(2);
    pay = pay.replace(/\./g, '');
    return {
      time: time,
      km : km,
      pay:pay.toString()
    }
  }

  findAll() {
    return `This action returns all payment`;
  }

  findOne(id: number) {
    return `This action returns a #${id} payment`;
  }

  update(id: number, updatePaymentDto: UpdatePaymentDto) {
    return `This action updates a #${id} payment`;
  }

  remove(id: number) {
    return `This action removes a #${id} payment`;
  }
}
