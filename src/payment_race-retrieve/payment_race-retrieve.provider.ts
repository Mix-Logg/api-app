import { DataSource } from 'typeorm';
import { PaymentRaceRetrieve } from './entities/payment_race-retrieve.entity';

export const paymentRaceRetrieveProviders = [
  {
    provide: 'PAYMENTRACERETRIEVE_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(PaymentRaceRetrieve),
    inject: ['DATA_SOURCE'],
  },
];