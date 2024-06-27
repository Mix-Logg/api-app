export class CreatePaymentDeliveryDto {
    id_user   : number;
    amount_out: string;
    pix       : string;
    type      : string;
    tax      ?: string;
    taxPix    : string;
    taxFull   : string;
    status    : string;
    create_at?: string;
}
