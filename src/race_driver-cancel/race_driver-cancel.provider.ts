import { DataSource } from 'typeorm';
import { RaceDriverCancel } from './entities/race_driver-cancel.entity';

export const raceDriverCancelProviders = [
  {
    provide: 'RACEDRIVERCANCEL_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(RaceDriverCancel),
    inject: ['DATA_SOURCE'],
  },
];