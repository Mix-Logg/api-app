import { DataSource } from 'typeorm';
import { PaymentRace } from './entities/payment_race.entity';

export const paymentRaceProviders = [
  {
    provide: 'PAYMENTRACE_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(PaymentRace),
    inject: ['DATA_SOURCE'],
  },
];