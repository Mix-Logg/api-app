import { Module, } from '@nestjs/common';
import { DriverService } from './driver.service';
import { DriverController } from './driver.controller';
import { DatabaseModule } from 'src/database/database.module';
import { driverProviders } from './driver.provider';
import { AddressModule } from 'src/address/address.module';
import { RecordPlugModule } from 'src/record_plug/record_plug.module';
import { VehicleModule } from 'src/vehicle/vehicle.module';

@Module({
  imports:[DatabaseModule, AddressModule],
  controllers: [DriverController],
  providers: [...driverProviders,DriverService],
  exports:[DriverService]
})
export class DriverModule {}
