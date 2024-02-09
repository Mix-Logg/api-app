import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { DatabaseModule } from 'src/database/database.module';
import { adminProviders } from './admin.provider';
import { EmailModule } from 'src/email/email.module';


@Module({
  imports:[DatabaseModule, EmailModule],
  controllers: [AdminController],
  providers: [...adminProviders,AdminService],
  exports: [AdminService]
})
export class AdminModule {}
