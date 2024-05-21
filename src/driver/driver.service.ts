import { Inject, Injectable } from '@nestjs/common';
import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateStatus } from './dto/update-status-driver.dto';
import { UpdateCnh } from './dto/update-cnh-driver.dto';
import { UpdateCpf } from './dto/update-cpf-driver.dto';
import { Driver } from './entities/driver.entity'
import { DeepPartial, In, Repository, getRepository } from 'typeorm';
import { AddressService } from 'src/address/address.service';
import { ValidateDates } from './dto/validate-driver.dto';
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

  validateDates(validateDates:ValidateDates){
    switch (validateDates.validate) {
      case 'cnh':
          try {
              const CurrentDate = new Date();
              const dateCNH = new Date(validateDates.value);
              dateCNH.setDate(dateCNH.getDate() + 30);
              if (dateCNH < CurrentDate) {
                return {
                  status: 205,
                  msg: "Expired driver's license"
                };
              }
              return {
                status: 200,
                msg: "Valid driver's license"
              };
          } catch (error) {
            return {
              status: 500,
              msg: "Internal Server Error"
            };
      }
      case 'age':
        const dobDate = new Date(validateDates.value);
        const today = new Date();
        let age = today.getFullYear() - dobDate.getFullYear();
        const monthDiff = today.getMonth() - dobDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dobDate.getDate())) {
          age--;
        }
        if(age >= 18){
          return {
            status: 200,
            msg: "Driver is of legal age"
          };
        }
        return {
          status: 205,
          msg: "Driver is not of legal age"
        }; 
      default:
        break;
    }
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
      
  async findByIds(Ids: number[]){
        if(Ids.length == 0){
          return {
            status: 500,
            message:'No have id'
          }
        }
        // return await this.driverRepository.createQueryBuilder('driver')
        // .where('driver.id IN (:...ids)', { ids: Ids })
        // .getMany();
        return await this.driverRepository.find({
          where: {
            id: In(Ids),
          },
        });
  }
      
  async update(id: number, updateStatus: UpdateStatus) {
    try{
      await this.driverRepository.update(id,updateStatus);
      return {
        status: 201,
        msg:'Successful Data Updated'
      }
    }catch(e){
      console.log(e)
      return {
        status:500,
        msg:'Error server internal'
      }
    }
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
  
  async verifyCpf(cpf: String){
    const res = await this.driverRepository
    .createQueryBuilder("driver")
    .where('cpf = :cpf',  { cpf} )
    .getOne();
    if(res != null){
      return 200
    }
    return 500;
  }
  
  async getUser(cpf:String){
    const user = await this.driverRepository
    .createQueryBuilder("driver")
    .where('cpf = :cpf',  { cpf } ) 
    .getOne();
    if(user != null){
      return user;
    }else{
      return 500
    }
  }
  
  remove(id: number) {
    return `This action removes a #${id} driver`;
  }
  
}
