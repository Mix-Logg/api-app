import { Inject, Injectable } from '@nestjs/common';
import { CreatePaymentRaceDto } from './dto/create-payment_race.dto';
import { UpdatePaymentRaceDto } from './dto/update-payment_race.dto';
import { PaymentRace } from './entities/payment_race.entity';
import { Repository } from 'typeorm';
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

  async findAll() {
    return `This action returns all paymentRace`;
  }

  findOne(id: number) {
    return `This action returns a #${id} paymentRace`;
  }

  update(id: number, updatePaymentRaceDto: UpdatePaymentRaceDto) {
    return `This action updates a #${id} paymentRace`;
  }

  remove(id: number) {
    return `This action removes a #${id} paymentRace`;
  }
}
