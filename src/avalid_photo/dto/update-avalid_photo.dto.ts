import { PartialType } from '@nestjs/swagger';
import { CreateAvalidPhotoDto } from './create-avalid_photo.dto';

export class UpdateAvalidPhotoDto extends PartialType(CreateAvalidPhotoDto) {}
