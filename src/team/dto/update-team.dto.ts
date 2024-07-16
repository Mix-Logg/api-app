import { PartialType } from '@nestjs/swagger';
import { CreateTeamDto } from './create-team.dto';

export class UpdateTeamDto extends PartialType(CreateTeamDto) {
    id_admin    ?:number;
    id_driver   ?:number;
    id_vehicle  ?:number;
    id_auxiliary?:number;
    update_at   ?:string;
    delete_at   ?:string;
}
