import { Module } from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import { VehicleController } from './vehicle.controller';
import { DatabaseModule } from 'src/database/database.module';
import { vehicleProviders } from './vehicle.provider';
import { DriverModule } from 'src/driver/driver.module';
import { RecordPlugModule } from 'src/record_plug/record_plug.module';

@Module({
  imports:[DatabaseModule, DriverModule, RecordPlugModule],
  controllers: [VehicleController],
  providers: [...vehicleProviders,VehicleService],
  exports:[VehicleService]
})
export class VehicleModule {}
