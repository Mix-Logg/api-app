import { Module } from '@nestjs/common';
import { OperationService } from './operation.service';
import { OperationController } from './operation.controller';
import { DatabaseModule } from 'src/database/database.module';
import { operationProviders } from './operation.provider';
@Module({
  imports:[DatabaseModule],
  controllers: [OperationController],
  providers: [...operationProviders,OperationService],
  exports:[OperationService]
})
export class OperationModule {}
