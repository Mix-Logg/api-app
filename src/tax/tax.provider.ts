import { DataSource } from 'typeorm';
import { Tax } from './entities/tax.entity';

export const taxProviders = [
  {
    provide: 'TAX_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Tax),
    inject: ['DATA_SOURCE'],
  },
];