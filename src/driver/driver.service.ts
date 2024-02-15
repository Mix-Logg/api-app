import { Inject, Injectable } from '@nestjs/common';
import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateStatus } from './dto/update-status-driver.dto';
import { UpdateCnh } from './dto/update-cnh-driver.dto';
import { UpdateCpf } from './dto/update-cpf-driver.dto';
import { Driver } from './entities/driver.entity'
import { DeepPartial, Repository } from 'typeorm';
import { AddressService } from 'src/address/address.service';

@Injectable()
export class DriverService {
  constructor(
    @Inject('DRIVER_REPOSITORY') 
    private driverRepository: Repository<Driver>,
  ){}
 
  async create(createDriverDto: CreateDriverDto) {
    const response = await this.driverRepository.save(createDriverDto);
    return response.id
  }

  findAll() {
    return this.driverRepository.find();
  }

  findOne(id: number) {
    return this.driverRepository.findOne({where:{id}});
  }

  async findDriverEmail(email: string) {
    const response = await this.driverRepository.findOne({where:{email}});
      if(response === null)
      {
        return {
          "email":"notExist"
        }
      }else{
        return response
      }
  }

  async findDriverPhone(phone: string) {
    const response = await this.driverRepository.findOne({where:{phone}});
      if(response === null)
      {
        return {
          "phone":"notExist"
        }
      }else{
        return response
      }
  }

  async update(id: number, updateStatus: UpdateStatus) {
    const res = await this.driverRepository.save({
      id: id,
      cadastralStatus: updateStatus.cadastralStatus,
    });
    return 200
  }

  async updateCnh(updateCnh: UpdateCnh) {
    const uuid = updateCnh.id
    const { id, ...updatedData } = updateCnh;
    const res = await this.driverRepository.update(uuid, updatedData);
    if(res.affected){
      return 200
    }else{
      return 500
    }
  }

  async updateCpf(updateCpf: UpdateCpf) {
    const uuid = updateCpf.id
    const res = await this.driverRepository.update(uuid, updateCpf);
    if(res.affected){
      return 200
    }else{
      return 500
    }
  }

  async findOneDriver(cpf:string ,rg:string){
    const res = await this.driverRepository
      .createQueryBuilder("driver")
      .where('cpf = :cpf',  { cpf} ) 
      .andWhere('rg = :rg', { rg } ) 
      .getOne();
    if(res != null){
      return res
    }else{
      return 500
    }
  }

  remove(id: number) {
    return `This action removes a #${id} driver`;
  }
  
}
