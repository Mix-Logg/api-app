import { PartialType } from '@nestjs/swagger';
import { CreatePaymentRaceDto } from './create-payment_race.dto';

export class UpdatePaymentRaceDto extends PartialType(CreatePaymentRaceDto) {}
