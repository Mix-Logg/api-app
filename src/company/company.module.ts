import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { companyProviders } from './company.provider';
import { DatabaseModule } from 'src/database/database.module';
import { AddressModule } from 'src/address/address.module';
@Module({
  imports:[DatabaseModule, AddressModule],
  controllers: [CompanyController],
  providers: [...companyProviders, CompanyService],
})
export class CompanyModule {}

