import { Body, Controller, HttpCode, HttpException, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto'
import { VerifyAuthDto } from './dto/verify-auth.dto'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async create(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.login(createAuthDto.user,createAuthDto.password);
  }

  @Post('verify')
  async verify(@Body() VerifyAuthDto:VerifyAuthDto){
    return this.authService.verify(VerifyAuthDto.token);
  }

}
