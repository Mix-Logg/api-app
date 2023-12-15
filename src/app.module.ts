import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DriverModule } from './driver/driver.module';
import { AddressModule } from './address/address.module';

@Module({
  imports: [ DriverModule, AddressModule],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
