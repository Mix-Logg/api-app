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
import { CompanyModule } from './company/company.module';
import { MotorcycleModule } from './motorcycle/motorcycle.module';
import { TourModule } from './tour/tour.module';
import { FreightModule } from './freight/freight.module';
import { RaceModule } from './race/race.module';
import { ClientModule } from './client/client.module';
import { OperationModule } from './operation/operation.module';
import { LeadModule } from './lead/lead.module';
import { TeamModule } from './team/team.module';
import { CelCashModule } from './cel_cash/cel_cash.module';
import { PaymentDeliveryModule } from './payment_delivery/payment_delivery.module';
import { PaymentRaceModule } from './payment_race/payment_race.module';
import { PaymentRaceRetrieveModule } from './payment_race-retrieve/payment_race-retrieve.module';
import { TaxModule } from './tax/tax.module';



@Module({
  imports: [ConfigModule.forRoot({ envFilePath: ['.env.development.local', '.env.development'],}) , DriverModule, AddressModule, UploadBucketModule, VehicleModule, AdminModule, AuthModule, AvalidPhotoModule, AuxiliaryModule, UserModule, RecordPlugModule, CompanyModule, CompanyModule, MotorcycleModule, TourModule, FreightModule, RaceModule, ClientModule, OperationModule, LeadModule, TeamModule, CelCashModule, PaymentDeliveryModule, PaymentRaceModule, PaymentRaceRetrieveModule, TaxModule],
  controllers: [AppController],
  providers: [AppService, EmailService],
})

export class AppModule {}
