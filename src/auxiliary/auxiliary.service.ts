import { Inject, Injectable } from '@nestjs/common';
import { CreateAuxiliaryDto } from './dto/create-auxiliary.dto';
import { Repository } from 'typeorm';
import { UpdateStatus } from './dto/update-status-driver.dto';
import { Auxiliary } from './entities/auxiliary.entity';
import { UpdateCpf } from './dto/update-cpf-auxiliary.dto';
import { UpdateCnh } from './dto/update-cnh-auxiliary.dto';


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

  async updateCnh(updateCnh: UpdateCnh) {
    const uuid = updateCnh.id
    const { id, ...updatedData } = updateCnh;
    const res = await this.auxiliaryRepository.update(uuid, updatedData);
    if(res.affected){
      return 200
    }else{
      return 500
    }
  }

  async updateCpf(updateCpf: UpdateCpf) {
    const uuid = updateCpf.id
    const res = await this.auxiliaryRepository.update(uuid, updateCpf);
    if(res.affected){
      return 200
    }else{
      return 500
    }
  }

  

  remove(id: number) {
    return `This action removes a #${id} auxiliary`;
  }
}
