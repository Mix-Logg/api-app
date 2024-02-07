import { Module } from '@nestjs/common';
import { RecordPlugService } from './record_plug.service';
import { RecordPlugController } from './record_plug.controller';
import { DatabaseModule } from 'src/database/database.module';
import { recordPlugProviders } from './record_plug.provider';

@Module({
  imports:[DatabaseModule],
  controllers: [RecordPlugController],
  providers: [...recordPlugProviders,RecordPlugService],
})
export class RecordPlugModule {}
