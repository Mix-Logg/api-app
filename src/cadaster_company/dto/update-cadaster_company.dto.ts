import { PartialType } from '@nestjs/swagger';
import { CreateCadasterCompanyDto } from './create-cadaster_company.dto';

export class UpdateCadasterCompanyDto extends PartialType(CreateCadasterCompanyDto) {}
