export class CreatePaymentRaceDto {
    id?      :string;
    id_race? :number;
    id_client:number;
    type     :string;
    amount   :number;
    status   :string;
    create_at?:string;
}
