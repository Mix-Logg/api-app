import { Module } from '@nestjs/common';
import { DriverService } from './driver.service';
import { DriverController } from './driver.controller';
import { DatabaseModule } from 'src/database/database.module';
import { driverProviders } from './driver.provider';
import { AddressModule } from 'src/address/address.module';

@Module({
  imports:[DatabaseModule, AddressModule],
  controllers: [DriverController],
  providers: [...driverProviders,DriverService],
  exports:[DriverService]
})
export class DriverModule {}
