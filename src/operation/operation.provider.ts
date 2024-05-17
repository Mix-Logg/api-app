import { DataSource } from 'typeorm';
import { Operation } from './entities/operation.entity';

export const operationProviders = [
  {
    provide: 'OPERATION_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Operation),
    inject: ['DATA_SOURCE'],
  },
];