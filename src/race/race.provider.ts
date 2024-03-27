import { DataSource } from 'typeorm';
import { Race } from './entities/race.entity';

export const raceProviders = [
  {
    provide: 'RACE_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Race),
    inject: ['DATA_SOURCE'],
  },
];