import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity'
import { FindUser } from './dto/find-user.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY') 
    private userRepository: Repository<User>,
  ){}

  async create(createUserDto: CreateUserDto) {
    try {
      await this.userRepository.save(createUserDto);
      return 200
    } catch (error) {
      console.log(error)
      return 500
    }
  }

  findAll() {
    return `This action returns all user`;
  }

  async findOne(uuid:number, am:string, cpf:string) {
    const user = await this.userRepository.findOne({
      where: {
        cpf, 
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

  async update(id: number, updateUserDto: UpdateUserDto) {
    console.log(id)
    console.log(updateUserDto)
    const res = await this.userRepository.update(id, updateUserDto);
    if(res.affected){
      return 200
    }else{
      return 500
    }
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

}
