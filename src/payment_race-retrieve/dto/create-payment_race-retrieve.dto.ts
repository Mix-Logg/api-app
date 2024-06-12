export class CreatePaymentRaceRetrieveDto {
    id     ?: string;
    id_race: number;
    id_client: number;
    value  : string;
    motion : string;
    tax    : number;
    create_at?: string;
}
