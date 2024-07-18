import { PartialType } from '@nestjs/swagger';
import { CreateTrainingDto } from './create-training.dto';

export class UpdateTrainingDto extends PartialType(CreateTrainingDto) {
    uuid     ?: number;
    am       ?: string;
    occurence?: string;
    operation?: string;
    date     ?: Date;
    create_at?: string;
    update_at?: string
    delete_at?: string
}
