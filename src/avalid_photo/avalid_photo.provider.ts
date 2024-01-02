import { DataSource } from 'typeorm';
import { AvalidPhoto } from './entities/avalid_photo.entity';

export const avalidPhotoProviders = [
  {
    provide: 'AVALIDPHOTO_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(AvalidPhoto),
    inject: ['DATA_SOURCE'],
  },
];