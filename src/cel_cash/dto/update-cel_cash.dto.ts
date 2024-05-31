import { PartialType } from '@nestjs/swagger';
import { CreateCelCashDto } from './create-cel_cash.dto';

export class UpdateCelCashDto extends PartialType(CreateCelCashDto) {}
