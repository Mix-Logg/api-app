import { Inject, Injectable } from '@nestjs/common';
import { CreatePaymentRaceRetrieveDto } from './dto/create-payment_race-retrieve.dto';
import { UpdatePaymentRaceRetrieveDto } from './dto/update-payment_race-retrieve.dto';
import { PaymentRaceRetrieve } from './entities/payment_race-retrieve.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import findTimeSP from 'hooks/time';

@Injectable()
export class PaymentRaceRetrieveService {
  constructor(
    @Inject('PAYMENTRACERETRIEVE_REPOSITORY')
    private readonly paymentRaceRetrieve: Repository<PaymentRaceRetrieve>,
  ) {}
  
  async create(createPaymentRaceRetrieveDto: CreatePaymentRaceRetrieveDto) {
    const saltOrRounds = 10;
    const timeCurrent = findTimeSP();
    const id_paymentRetrieve = await bcrypt.hash(timeCurrent, saltOrRounds);
    createPaymentRaceRetrieveDto.id = `raceRetrieve-${id_paymentRetrieve}`;
    createPaymentRaceRetrieveDto.create_at = timeCurrent;
    const response = await this.paymentRaceRetrieve.save(createPaymentRaceRetrieveDto);
    if(response != null){
      return {
        status:201,
        message:'Successfully created retrieve race',
        id:response.id,
      }
    }
    return {
      status: 500,
      message:'Server error'
    }
  }

  findAll() {
    return `This action returns all paymentRaceRetrieve`;
  }

  findOne(id: string) {
    return this.paymentRaceRetrieve.findOne({ where: { id } });
  }

  async update(id: string, updatePaymentRaceRetrieveDto: UpdatePaymentRaceRetrieveDto) {
    const res = await this.paymentRaceRetrieve.update(id, updatePaymentRaceRetrieveDto);
    if(res.affected){
      return {
        status: 200,
        message:'Updated successfully'
      }
    }
    return {
      status: 500,
      message:'Unable to update'
    }
  }

  remove(id: number) {
    return `This action removes a #${id} paymentRaceRetrieve`;
  }
}
