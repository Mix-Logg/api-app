import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthUserApp } from './dto/auth-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Post('auth')
  auth(@Body() authUserApp: AuthUserApp) {
    return this.userService.auth(authUserApp);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get('one/:cpf')
  findOneById(
    @Param('cpf') cpf: string,
  ) {
    return this.userService.findOneByCpf(cpf);
  }

  @Get(':id/:am/')
  findOne(
    @Param('id') id: number,
    @Param('am') am: string, ){
    return this.userService.findOne(id, am);
  }

  @Get(':cpf')
  VerifyOne(
    @Param('cpf') cpf: string ){
    return this.userService.verifyOne(cpf);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
      return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
