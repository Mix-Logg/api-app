import { Module } from '@nestjs/common';
import { TourService } from './tour.service';
import { TourController } from './tour.controller';
import { DatabaseModule } from 'src/database/database.module';
import { tourProviders } from './tour.provider';

@Module({
  imports:[DatabaseModule],
  controllers: [TourController],
  providers: [...tourProviders, TourService],
})
export class TourModule {}
