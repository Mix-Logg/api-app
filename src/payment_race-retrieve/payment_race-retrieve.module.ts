import { Module } from '@nestjs/common';
import { PaymentRaceRetrieveService } from './payment_race-retrieve.service';
import { PaymentRaceRetrieveController } from './payment_race-retrieve.controller';
import { DatabaseModule } from 'src/database/database.module';
import { paymentRaceRetrieveProviders } from './payment_race-retrieve.provider';

@Module({
  controllers: [PaymentRaceRetrieveController],
  providers: [...paymentRaceRetrieveProviders,PaymentRaceRetrieveService],
  imports  : [DatabaseModule],
  exports  : [PaymentRaceRetrieveService]
})
export class PaymentRaceRetrieveModule {}
