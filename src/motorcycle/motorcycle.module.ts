import { Module } from '@nestjs/common';
import { MotorcycleService } from './motorcycle.service';
import { MotorcycleController } from './motorcycle.controller';
import { DatabaseModule } from 'src/database/database.module';
import { motorcycleProviders } from './motorcycle.provider';

@Module({
  imports:[DatabaseModule],
  controllers: [MotorcycleController],
  providers: [...motorcycleProviders,MotorcycleService],
})
export class MotorcycleModule {}
