import { Module } from '@nestjs/common';
import { TrainingService } from './training.service';
import { TrainingController } from './training.controller';
import { DatabaseModule } from 'src/database/database.module';
import { trainingProviders } from './training.provider';


@Module({
  imports:[DatabaseModule],
  controllers: [TrainingController],
  providers: [...trainingProviders,TrainingService],

})
export class TrainingModule {}
