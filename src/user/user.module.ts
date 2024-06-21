import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DatabaseModule } from 'src/database/database.module';
import { userProviders } from './user.provider';
import { TaxModule } from 'src/tax/tax.module';

@Module({
  imports:[DatabaseModule, TaxModule],
  controllers: [UserController],
  providers: [...userProviders,UserService],
  exports:[UserService]
})
export class UserModule {}
