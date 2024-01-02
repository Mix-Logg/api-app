import { Module } from '@nestjs/common';
import { AvalidPhotoService } from './avalid_photo.service';
import { AvalidPhotoController } from './avalid_photo.controller';
import { avalidPhotoProviders } from './avalid_photo.provider';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports:[DatabaseModule],
  controllers: [AvalidPhotoController],
  providers: [...avalidPhotoProviders,AvalidPhotoService],

})

export class AvalidPhotoModule {}
