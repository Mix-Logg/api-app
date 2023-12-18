import { Module } from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import { VehicleController } from './vehicle.controller';
import { DatabaseModule } from 'src/database/database.module';
import { vehicleProviders } from './vehicle.provider';

@Module({
  imports:[DatabaseModule],
  controllers: [VehicleController],
  providers: [...vehicleProviders,VehicleService],
})
export class VehicleModule {}
