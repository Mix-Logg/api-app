import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MotoristaModule } from './motorista/motorista.module';
import { motoristaProviders } from './motorista/entities/motorista.provider';

@Module({
  imports: [MotoristaModule],
  controllers: [AppController],
  providers: [...motoristaProviders,AppService],

})
export class AppModule {}
