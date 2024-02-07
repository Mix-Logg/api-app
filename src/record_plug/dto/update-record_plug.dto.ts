import { PartialType } from '@nestjs/swagger';
import { CreateRecordPlugDto } from './create-record_plug.dto';

export class UpdateRecordPlugDto extends PartialType(CreateRecordPlugDto) {}
