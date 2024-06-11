import { Module } from '@nestjs/common';
import { PaymentRaceService } from './payment_race.service';
import { PaymentRaceController } from './payment_race.controller';
import { DatabaseModule } from 'src/database/database.module';
import { paymentRaceProviders } from './payment_race.provider';

@Module({
  imports:[DatabaseModule],
  controllers: [PaymentRaceController],
  providers: [...paymentRaceProviders,PaymentRaceService],
})
export class PaymentRaceModule {}
