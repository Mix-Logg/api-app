import { Inject, Injectable } from '@nestjs/common';
import { CreatePaymentDeliveryDto } from './dto/create-payment_delivery.dto';
import { UpdatePaymentDeliveryDto } from './dto/update-payment_delivery.dto';
import { PaymentDelivery } from './entities/payment_delivery.entity';
import { Repository } from 'typeorm';
import FindTimeSP from 'hooks/time';
@Injectable()
export class PaymentDeliveryService {
  constructor(
    @Inject('PAYMENTDELIVERY_REPOSITORY')
    private paymentDelivery: Repository<PaymentDelivery>,
  ) {}


  async create(createPaymentDeliveryDto: CreatePaymentDeliveryDto) {
    const time = FindTimeSP()
    createPaymentDeliveryDto.create_at = time;
    const response = await this.paymentDelivery.save(createPaymentDeliveryDto);
    if(response != null){
      return {
        status:201,
        message:'Successfully created payment delivery'
      }
    }
    return {
      status: 500,
      message:'Server error'
    }
  }

  findAll() {
    return `This action returns all paymentDelivery`;
  }

  findOne(id: number) {
    return `This action returns a #${id} paymentDelivery`;
  }

  update(id: number, updatePaymentDeliveryDto: UpdatePaymentDeliveryDto) {
    return `This action updates a #${id} paymentDelivery`;
  }

  remove(id: number) {
    return `This action removes a #${id} paymentDelivery`;
  }
}


