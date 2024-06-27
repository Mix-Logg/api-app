import { PartialType } from '@nestjs/swagger';
import { CreateRaceDriverCancelDto } from './create-race_driver-cancel.dto';

export class UpdateRaceDriverCancelDto extends PartialType(CreateRaceDriverCancelDto) {}
