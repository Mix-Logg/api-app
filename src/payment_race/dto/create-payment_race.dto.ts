export class CreatePaymentRaceDto {
    id       :string;
    id_race? :number;
    id_client:number;
    amount   :number;
    status   :string;
    create_at:string;
}
