import { Module } from '@nestjs/common';
import { CadasterCompanyService } from './cadaster_company.service';
import { CadasterCompanyController } from './cadaster_company.controller';

@Module({
  controllers: [CadasterCompanyController],
  providers: [CadasterCompanyService],
})
export class CadasterCompanyModule {}
