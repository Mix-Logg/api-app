export class CreateTeamDto {
    id_admin    :number;
    id_driver   :number;
    id_vehicle ?:number;
    id_auxiliary:number;
    create_at   :string;
}
