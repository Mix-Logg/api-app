import { Module } from '@nestjs/common';
import { RaceService } from './race.service';
import { RaceController } from './race.controller';
import { raceProviders } from './race.provider';
import { DatabaseModule } from 'src/database/database.module';
import { FreightService } from 'src/freight/freight.service';
@Module({
  imports:[DatabaseModule],
  controllers: [RaceController],
  providers: [...raceProviders,RaceService],
  exports: [RaceService]
})
export class RaceModule {}
