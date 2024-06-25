import { Module } from '@nestjs/common';
import { RaceDriverCancelService } from './race_driver-cancel.service';
import { RaceDriverCancelController } from './race_driver-cancel.controller';
import { DatabaseModule } from 'src/database/database.module';
import { raceDriverCancelProviders } from './race_driver-cancel.provider';
import { TaxModule } from 'src/tax/tax.module';
@Module({
  imports    : [DatabaseModule, TaxModule],
  controllers: [RaceDriverCancelController],
  providers  : [...raceDriverCancelProviders,RaceDriverCancelService],
  exports    : [RaceDriverCancelService]
})
export class RaceDriverCancelModule {}
