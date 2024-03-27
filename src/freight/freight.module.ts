import { Module } from '@nestjs/common';
import { FreightService } from './freight.service';
import { FreightGateway } from './freight.gateway';
import { DatabaseModule } from 'src/database/database.module';
import { RaceModule } from 'src/race/race.module';


@Module({
  imports:[DatabaseModule, RaceModule],
  providers: [FreightGateway, FreightService],
  exports: [FreightService]
})
export class FreightModule {}
