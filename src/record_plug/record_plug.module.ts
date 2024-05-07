import { Module } from '@nestjs/common';
import { RecordPlugService } from './record_plug.service';
import { RecordPlugController } from './record_plug.controller';
import { DatabaseModule } from 'src/database/database.module';
import { recordPlugProviders } from './record_plug.provider';
import { DriverModule } from 'src/driver/driver.module';
import { AuxiliaryModule } from 'src/auxiliary/auxiliary.module';


@Module({
  imports:[DatabaseModule, DriverModule, AuxiliaryModule],
  controllers: [RecordPlugController],
  providers: [...recordPlugProviders,RecordPlugService],
})
export class RecordPlugModule {}
