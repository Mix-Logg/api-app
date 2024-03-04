import { DataSource } from 'typeorm';
import { Tour } from './entities/tour.entity';

export const tourProviders = [
  {
    provide: 'TOUR_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Tour),
    inject: ['DATA_SOURCE'],
  },
];