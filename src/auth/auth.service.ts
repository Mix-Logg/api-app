import { HttpCode, HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AdminService } from 'src/admin/admin.service';
import { DriverService } from 'src/driver/driver.service';

@Injectable()
export class AuthService {
    constructor(
      private jwtService: JwtService,
      private admService: AdminService,
      private driverService: DriverService
    ) {}

    @HttpCode(HttpStatus.OK)
    async login(username:string, password:string){
      const user = await this.admService.findUser(username)
      if (user.password !== password || user === null) {
        throw new UnauthorizedException();
      }
      const payload = {
        'status': 200,
        'id':user.id,
        'user':username,
      }
      const  token =  await this.jwtService.signAsync(payload);
      return token
    }

    @HttpCode(HttpStatus.OK)
    async getDataAdmin(token:string){
      try{
        const tokenResult = await this.jwtService.verifyAsync(token);
        return tokenResult
      }catch(err){
        throw new HttpException('Token inválido', HttpStatus.BAD_REQUEST); 
      }
    }

    @HttpCode(HttpStatus.OK)
    async verify(token:string){
      try{
        const tokenResult = await this.jwtService.verifyAsync(token);
        if( tokenResult.status === 200 ){
          return tokenResult.status
        }
      }catch(err){
        throw new HttpException('Token inválido', HttpStatus.BAD_REQUEST); 
      }
    }

    async verifyUser(am:string ,email:string ,phone:string){
      if(am === 'driver'){
        const driverEmail = await this.driverService.findDriverEmail(email)
        const driverPhone = await this.driverService.findDriverPhone(phone)
        if(driverPhone.phone === 'notExist' && driverEmail.email === 'notExist'){
          return {"driver" : "notExist"}
        }
        else if(driverEmail.email === 'notExist'){
          return {"driver" : "erroEmail"}
        }
        else if(driverPhone.phone === 'notExist'){
          return {"driver" : "erroPhone"}
        }
        else{
          return driverEmail
        }
      }
    }
}





