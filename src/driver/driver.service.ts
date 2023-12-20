import { Inject, Injectable } from '@nestjs/common';
import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';
import { Driver } from './entities/driver.entity'
import { DeepPartial, Repository } from 'typeorm';
import { AddressService } from 'src/address/address.service';

@Injectable()
export class DriverService {
  constructor(
    @Inject('DRIVER_REPOSITORY') 
    private driverRepository: Repository<Driver>,
    // private addressService: AddressService
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

  update(id: number, updateDriverDto: UpdateDriverDto) {
    return `This action updates a #${id} driver`;
  }

  remove(id: number) {
    return `This action removes a #${id} driver`;
  }
  
}
