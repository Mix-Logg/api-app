import { Inject, Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Client } from './entities/client.entity';
import { Repository } from 'typeorm';
import Time from '../../hooks/time';
import { Sign } from './dto/sign-client.dto';

@Injectable()
export class ClientService {
  constructor(
    @Inject('CLIENT_REPOSITORY')
    private clientRepository: Repository<Client>,
  ) {}

  async sign(sign: Sign) {
    const email = sign.email;
    try {
      const user = await this.clientRepository.findOne({
        where: { email },
      });
      if (!user) {
        return {
          status: 401,
          msg: 'Unauthorized',
        };
      }
      if (user.password === sign.password) {
        return {
          status: 200,
          msg: 'Authorized',
        };
      }
      return {
        status: 401,
        msg: 'Unauthorized',
      };
    } catch (e) {
      console.log(e);
      return {
        status: 500,
        msg: 'Error internal',
      };
    }
  }

  async create(createClientDto: CreateClientDto) {
    const time = Time();
    const verifyEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    createClientDto.create_at = time;
    try {
      const email = createClientDto.email;
      const existingEmail = await this.clientRepository.findOne({
        where: { email },
      });
      if (existingEmail) {
        return {
          status: 409,
          msg: 'Email Error Already Exists',
        };
      }
      if (!verifyEmail.test(email)) {
        return {
          status: 409,
          msg: 'Email Invalid',
        };
      }
      if (
        createClientDto.phone.length < 11 ||
        createClientDto.phone.length > 12
      ) {
        return {
          status: 409,
          msg: 'Phone Invalid',
        };
      }
      if (createClientDto.password.length != 10) {
        return {
          status: 409,
          msg: 'Password invalid',
        };
      }
      if (createClientDto.name.length < 4) {
        return {
          status: 409,
          msg: 'Name invalid',
        };
      }
      await this.clientRepository.save(createClientDto);
      return {
        status: 201,
        msg: 'Successful registration user',
      };
    } catch (e) {
      console.log(e);
      return {
        status: 500,
        msg: 'Error internal',
      };
    }
  }

  findAll() {
    return this.clientRepository.find();
  }

  findOne(email: string) {
    return this.clientRepository.findOne({ where: { email } });
  }

  findOneById(id: number) {
    return this.clientRepository.findOne({ where: { id } });
  }

  async update(id: number, updateClientDto: UpdateClientDto) {
    try {
      // Verificar se o cliente com o ID fornecido existe
      const clientToUpdate = await this.clientRepository.findOne({ where: { id: id } });
      
      if (!clientToUpdate) {
        throw new NotFoundException('Client not found');
      }
  
      // Verificar se o email fornecido é diferente do email atual do cliente
      if (updateClientDto.email !== clientToUpdate.email) {
        // Verificar se o novo email já está sendo usado por outro cliente
        const isEmailExists = await this.clientRepository.findOne({ where: { email: updateClientDto.email } });
        
        if (isEmailExists) {
          throw new ConflictException('Email already exists');
        }
      }
      
      await this.clientRepository.update(id, updateClientDto);
      return {
        status: 201,
        msg: 'Successful Data Updated',
      };
    } catch (e) {
      console.error(e);
      return {
        status: 500,
        msg: 'Error server internal',
      };
    }
  }

  async remove(id: number) {
    return id;
  }
}
