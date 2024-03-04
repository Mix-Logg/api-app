import { DataSource } from 'typeorm';
import { Motorcycle } from './entities/motorcycle.entity';

export const motorcycleProviders = [
  {
    provide: 'MOTORCYCLE_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Motorcycle),
    inject: ['DATA_SOURCE'],
  },
];