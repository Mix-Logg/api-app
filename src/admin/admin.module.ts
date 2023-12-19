import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { DatabaseModule } from 'src/database/database.module';
import { adminProviders } from './admin.provider';

@Module({
  imports:[DatabaseModule],
  controllers: [AdminController],
  providers: [...adminProviders,AdminService],
  exports: [AdminService]
})
export class AdminModule {}
