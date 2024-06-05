import { PartialType } from '@nestjs/swagger';
import { CreatePaymentDeliveryDto } from './create-payment_delivery.dto';

export class UpdatePaymentDeliveryDto extends PartialType(CreatePaymentDeliveryDto) {}
