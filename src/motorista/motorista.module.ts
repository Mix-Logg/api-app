import { Module } from '@nestjs/common';
import { MotoristaService } from './motorista.service';
import { MotoristaController } from './motorista.controller';
import { DatabaseModule } from 'src/database/module';

@Module({
  imports:[DatabaseModule],
  controllers: [MotoristaController],
  providers: [MotoristaService],
})
export class MotoristaModule {}
