import { DataSource } from 'typeorm';
import { Company } from './entities/company.entity';

export const companyProviders = [
  {
    provide: 'COMPANY_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Company),
    inject: ['DATA_SOURCE'],
  },
];