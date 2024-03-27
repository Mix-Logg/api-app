import { Inject, Injectable } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Client } from './entities/client.entity';
import { Repository } from 'typeorm';
import Time from '../../hooks/time'
import bcrypt from "bcryptjs-react";

@Injectable()
export class ClientService {
  constructor(
    @Inject('CLIENT_REPOSITORY') 
    private clientRepository: Repository<Client>,
  ){}
 

  async create(createClientDto: CreateClientDto) {
    const time = Time()
    const verifyEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    createClientDto.create_at = time;
    try{
      const email = createClientDto.email
      const existingEmail = await this.clientRepository.findOne({
        where: { email },
      });
      if(existingEmail){
        return {
          status: 409,
          msg: 'Email Error Already Exists'
        }
      }
      if(!verifyEmail.test(email)){
        return {
          status: 409,
          msg: 'Email Invalid'
        }
      }
      if(createClientDto.phone.length < 11 || createClientDto.phone.length > 12){
        return {
          status: 409,
          msg: 'Phone Invalid'
        }
      }
      if(createClientDto.password.length != 10){
        return {
          status: 409,
          msg: 'Password invalid'
        }
      }
      if(createClientDto.name.length < 4){
        return {
          status: 409,
          msg: 'Name invalid'
        }
      }
      await this.clientRepository.save(createClientDto);
      return {
        status: 201,
        msg: 'Successful registration user'
      }
    }catch(e){
      console.log(e)
      return {
        status: 500,
        msg: 'Error internal'
      }
    } 
  }

  findAll() {
    return `This action returns all client`;
  }

  findOne(id: number) {
    return `This action returns a #${id} client`;
  }

  update(id: number, updateClientDto: UpdateClientDto) {
    return `This action updates a #${id} client`;
  }

  remove(id: number) {
    return `This action removes a #${id} client`;
  }
}
