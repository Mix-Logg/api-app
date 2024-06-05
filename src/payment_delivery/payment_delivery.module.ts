import { Module } from '@nestjs/common';
import { PaymentDeliveryService } from './payment_delivery.service';
import { PaymentDeliveryController } from './payment_delivery.controller';
import { DatabaseModule } from 'src/database/database.module';
import { paymentDeliveryProviders } from './payment_delivery.provider';

@Module({
  imports:[DatabaseModule],
  controllers: [PaymentDeliveryController],
  providers: [...paymentDeliveryProviders,PaymentDeliveryService],
})
export class PaymentDeliveryModule {}
