import { DataSource } from 'typeorm';
import { CelCash } from './entities/cel_cash.entity';

export const celCashProviders = [
  {
    provide: 'CElCASH_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(CelCash),
    inject: ['DATA_SOURCE'],
  },
];