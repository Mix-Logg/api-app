import { PartialType } from '@nestjs/swagger';
import { CreateCompanyDto } from './create-company.dto';

export class UpdateCompanyDto extends PartialType(CreateCompanyDto) {
  id: number;
  corporateName: string;
  email: string;
  companyTelephone: string;
  cnpj: string;
  branchActivity: string;
}
