import { Module } from '@nestjs/common';
import { PaymentRaceService } from './payment_race.service';
import { PaymentRaceController } from './payment_race.controller';
import { DatabaseModule } from 'src/database/database.module';
import { paymentRaceProviders } from './payment_race.provider';
import { TaxModule } from 'src/tax/tax.module';

@Module({
  imports:[DatabaseModule, TaxModule],
  controllers: [PaymentRaceController],
  providers: [...paymentRaceProviders,PaymentRaceService],
  exports:[PaymentRaceService]
})
export class PaymentRaceModule {}
