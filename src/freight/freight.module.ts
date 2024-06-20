import { Module } from '@nestjs/common';
import { FreightService } from './freight.service';
import { FreightGateway } from './freight.gateway';
import { DatabaseModule } from 'src/database/database.module';
import { RaceModule } from 'src/race/race.module';
import { UserModule } from 'src/user/user.module';
import { TaxModule } from 'src/tax/tax.module';


@Module({
  imports:[DatabaseModule, RaceModule, UserModule, TaxModule],
  providers: [FreightGateway, FreightService],
  exports: [FreightService]
})
export class FreightModule {}
