import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { AdminModule } from 'src/admin/admin.module';
import { AdminService } from 'src/admin/admin.service';
import { DriverModule } from 'src/driver/driver.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports:[JwtModule.register({ secret: 'MIX@_2023YXGGDSAD' }),AdminModule ,DriverModule]
})
export class AuthModule {}
