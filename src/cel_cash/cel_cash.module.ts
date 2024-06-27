import { Module } from '@nestjs/common';
import { CelCashService } from './cel_cash.service';
import { CelCashController } from './cel_cash.controller';
import { DatabaseModule } from 'src/database/database.module';
import { DriverModule } from 'src/driver/driver.module';
import { AuxiliaryModule } from 'src/auxiliary/auxiliary.module';
import { UserModule } from 'src/user/user.module';
import { PaymentRaceModule } from 'src/payment_race/payment_race.module';
import { PaymentRaceRetrieveModule } from 'src/payment_race-retrieve/payment_race-retrieve.module';
import { AddressModule } from 'src/address/address.module';
@Module({
  imports: [DatabaseModule, DriverModule, AuxiliaryModule, UserModule, PaymentRaceModule, PaymentRaceRetrieveModule, AddressModule],
  controllers: [CelCashController],
  providers: [CelCashService],
})
export class CelCashModule {}
