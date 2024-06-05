import { DataSource } from 'typeorm';
import { PaymentDelivery } from './entities/payment_delivery.entity';

export const paymentDeliveryProviders = [
  {
    provide: 'PAYMENTDELIVERY_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(PaymentDelivery),
    inject: ['DATA_SOURCE'],
  },
];