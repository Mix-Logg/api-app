import { PartialType } from '@nestjs/swagger';
import { CreatePaymentRaceRetrieveDto } from './create-payment_race-retrieve.dto';

export class UpdatePaymentRaceRetrieveDto extends PartialType(CreatePaymentRaceRetrieveDto) {}
