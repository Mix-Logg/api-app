import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { ThrottlerModule } from '@nestjs/throttler/dist/throttler.module';

@Module({
  imports:[
    ThrottlerModule.forRoot([
      {ttl: 60000,
      limit: 10,}
    ]),
  ],
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentModule {}
