import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DriverModule } from './driver/driver.module';
import { AddressModule } from './address/address.module';
import { UploadBucketModule } from './upload-bucket/upload-bucket.module';
import { VehicleModule } from './vehicle/vehicle.module';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';
import { AvalidPhotoModule } from './avalid_photo/avalid_photo.module';

@Module({
  imports: [ DriverModule, AddressModule, UploadBucketModule, VehicleModule, AdminModule, AuthModule, AvalidPhotoModule],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
