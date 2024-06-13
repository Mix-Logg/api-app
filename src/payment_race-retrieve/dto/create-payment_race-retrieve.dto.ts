export class CreatePaymentRaceRetrieveDto {
    id     ?: string;
    id_race : number;
    id_client: number;
    value  : string;
    motion : string;
    tax    : number;
    type   : string;
    pix    : string;
    status : string;
    create_at?: string;
}
