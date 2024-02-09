import {ConfigModule} from "@nestjs/config";
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
import { AuxiliaryModule } from './auxiliary/auxiliary.module';
import { UserModule } from './user/user.module';
import { RecordPlugModule } from './record_plug/record_plug.module';
import { EmailService } from './email/email.service';


@Module({
  imports: [ConfigModule.forRoot() , DriverModule, AddressModule, UploadBucketModule, VehicleModule, AdminModule, AuthModule, AvalidPhotoModule, AuxiliaryModule, UserModule, RecordPlugModule],
  controllers: [AppController],
  providers: [AppService, EmailService],
})

export class AppModule {}
