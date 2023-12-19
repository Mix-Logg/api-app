import { HttpCode, HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AdminService } from 'src/admin/admin.service';

@Injectable()
export class AuthService {
    constructor(
      private jwtService: JwtService,
      private admService: AdminService
    ) {}

    @HttpCode(HttpStatus.OK)
    async login(username:string, password:string){
      const user = await this.admService.findUser(username)
      if (user.password !== password || user === null) {
        throw new UnauthorizedException();
      }
      const payload = {
        'status': 200,
        'id':'user.id',
        'user':'username',
      }
      const  token =  await this.jwtService.signAsync(payload);
      return token
    }

    @HttpCode(HttpStatus.OK)
    async verify(token){
      try{
        const tokenResult = await this.jwtService.verifyAsync(token);
        console.log(tokenResult)
        if( tokenResult.status === 200 ){
          return tokenResult.status
        }
      }catch(err){
        throw new HttpException('Token inválido', HttpStatus.BAD_REQUEST); 
      }
    }

}
