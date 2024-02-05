import { Inject, Injectable } from '@nestjs/common';
import { CreateAuxiliaryDto } from './dto/create-auxiliary.dto';
import { Repository } from 'typeorm';
import { UpdateStatus } from './dto/update-status-driver.dto';
import { Auxiliary } from './entities/auxiliary.entity';


@Injectable()
export class AuxiliaryService {
  constructor(
    @Inject('AUXILIARY_REPOSITORY') 
    private auxiliaryRepository: Repository<Auxiliary>,
  ){}

  async create(createAuxiliaryDto: CreateAuxiliaryDto) {
    const response = await this.auxiliaryRepository.save(createAuxiliaryDto);
    return response.id
  }

  findAll() {
    return this.auxiliaryRepository.find();
    
  }

  async findOne(id: number) {
    const response = await this.auxiliaryRepository.findOne({where:{id}});
    return response
  }

  async findEmail(email: string) {
    const response = await this.auxiliaryRepository.findOne({where:{email}});
      if(response === null)
      {
        return {
          "email":"notExist"
        }
      }else{
        return response
      }
  }

  async findPhone(phone: string) {
    const response = await this.auxiliaryRepository.findOne({where:{phone}});
      if(response === null)
      {
        return {
          "phone":"notExist"
        }
      }else{
        return response
      }
  }

  async update(id: number, UpdateStatus: UpdateStatus) {
    const res = await this.auxiliaryRepository.save({
      id: id,
      cadastralStatus: UpdateStatus.cadastralStatus,
    });
    return 200
  }

  remove(id: number) {
    return `This action removes a #${id} auxiliary`;
  }
}
