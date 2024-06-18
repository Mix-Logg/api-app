import { Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { DatabaseModule } from 'src/database/database.module';
import { clientProviders } from './client.provider';
import { EmailModule } from 'src/email/email.module';

@Module({
  imports:[DatabaseModule, EmailModule],
  controllers: [ClientController],
  providers: [...clientProviders,ClientService],
  exports:[ ClientService],
})
export class ClientModule {}
