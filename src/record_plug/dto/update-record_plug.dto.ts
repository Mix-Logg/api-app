import { PartialType } from '@nestjs/swagger';
import { CreateRecordPlugDto } from './create-record_plug.dto';

export class UpdateRecordPlugDto extends PartialType(CreateRecordPlugDto) {
  uuid?: number;
  id_admin?: number;
  timeline?: number;
  am?: string;
  aproved?:string;
  operation?: string;
  motion?: string;
  delete_at?:Date;
}
