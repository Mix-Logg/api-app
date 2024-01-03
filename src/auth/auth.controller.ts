import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto'
import { VerifyUserAuthDto } from './dto/verifyUser-auth.dto'
import { VerifyAuthDto } from './dto/verify-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async create(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.login(createAuthDto.user,createAuthDto.password);
  }

  @Post('verify')
  async verify(@Body() verifyAuthDto:VerifyAuthDto){
    return this.authService.verify(verifyAuthDto.token);
  }

  @Get(':token')
  async getDataAdmin(@Param('token') token: string,){
    return this.authService.getDataAdmin(token);
  }

  @Get(':phone/:email/:am')
  async verifyUser(  
    @Param('phone') phone: string,
    @Param('email') email: string,
    @Param('am') am: string
  ) {
    return await this.authService.verifyUser(am ,email , phone);
  }

}
