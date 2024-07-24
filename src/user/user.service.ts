import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity'
import { FindUser } from './dto/find-user.dto';
import { AuthUserApp } from './dto/auth-user.dto';
import { TaxService } from 'src/tax/tax.service';
import * as bcrypt from 'bcryptjs-react';
import findTimeSP from 'hooks/time';
@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY') 
    private userRepository: Repository<User>,
    private taxService : TaxService,
  ){}

  async create(createUserDto: CreateUserDto) {
    try {
      const time = await findTimeSP();
      createUserDto.create_at = time
      await this.userRepository.save(createUserDto);
      return 200;
    } catch (error) {
        console.log(error);
        return 500;
    }
}

  findAll() {
    return `This action returns all user`;
  }

  async findOne(uuid:number, am:string) {
    const user = await this.userRepository.findOne({
      where: {
        am, 
        uuid 
      }
    });
    if(user === null){
      return 500
    }else{
      return user
    }
  }

  async findOneByCpf(cpf:string) {
    const user = await this.userRepository.findOne({
      where: {
        cpf
      }
    });
    if(user === null){
      return {
        message: 'Registered not found',
        status:  500
      }
    }else{
      return user
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const res = await this.userRepository.update(id, updateUserDto);
    if(res.affected){
      return 200
    }else{
      return 500
    }
  }

  async auth(authUserApp: AuthUserApp){
    const user = await this.userRepository.findOne({
      where: {
        cpf: authUserApp.cpf
      }
    });
    if(user != null){
      const passConfirm = authUserApp.password === user.password;
      if(passConfirm){
        return user
      }else{
        return 500
      }
    }else{
      return 500
    }
  }

  async verifyOne(cpf:string){
    const user = await this.userRepository.findOne({
      where: {
        cpf: cpf
      }
    });
    if(user != null){
      return 500
    }else{
      return 200
    }
  }

  async taxCancelRace(am:string, uuid:number){
    const user   = await this.findOne(uuid, am);
    const taxs   = await this.taxService.findAll();
    if(user != 500){
      const newAmount = (parseInt(user.amount) - taxs[0].driver_cancel)
      this.update(user.id, {amount:newAmount.toString()})
    }
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

}
