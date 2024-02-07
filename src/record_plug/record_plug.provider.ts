import { DataSource } from 'typeorm';
import { RecordPlug } from './entities/record_plug.entity';

export const recordPlugProviders = [
  {
    provide: 'RECORDPLUG_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(RecordPlug),
    inject: ['DATA_SOURCE'],
  },
];