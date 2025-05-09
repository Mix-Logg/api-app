import { Module } from '@nestjs/common';
import { OperationTodayService } from './operation_today.service';
import { OperationTodayController } from './operation_today.controller';
import { DatabaseModule } from 'src/database/database.module';
import { operationTodayProviders } from './operation_today.provider';
import { VehicleModule } from 'src/vehicle/vehicle.module';
@Module({
  imports : [DatabaseModule, VehicleModule],
  controllers: [OperationTodayController],
  providers: [...operationTodayProviders,OperationTodayService],
})
export class OperationTodayModule {}
