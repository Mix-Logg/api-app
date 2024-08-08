import { Inject, Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Company } from './entities/company.entity';
import { Repository } from 'typeorm';
import { AddressService } from 'src/address/address.service';
@Injectable()
export class CompanyService {
  constructor(
    @Inject('COMPANY_REPOSITORY')
    private companyRepository: Repository<Company>,
    private addressService: AddressService,
  ) {};

  async create(createCompanyDto: CreateCompanyDto) {
    const response = await this.companyRepository.save(createCompanyDto);
    if(response){
      const dtoAddress = {
        am  :'company',
        uuid: response.id
      }
      const address = this.addressService.create(dtoAddress)
      if(address.status == 201){
        return {
          status : 201 ,
          data   :{
            id   : response.id,
          }
        }
      }
      return {
        status : 501,
        message:'created company without address'
      }
    };
    return {
      status: 500,
      msg: "Internal Server Error"
    };
  };

  findAll() {
    return this.companyRepository.find();
  };

  async findOne(companyTelephone: string, email: string) {
    const existingRecordByEmail = await this.companyRepository.findOne({
      where: { email },
    });

    const existingRecordByTelephone = await this.companyRepository.findOne({
      where: { companyTelephone },
    });

    if (existingRecordByEmail !== null || existingRecordByTelephone !== null) {
      const obj = {
        status: 409,
        company: existingRecordByEmail
      }
      return obj;
    }

    return {
      status: 500,
      message: 'Company not found'
    };
  };

  async update(updateCompanyDto: UpdateCompanyDto) {
    const id = updateCompanyDto.id
    const companyTelephone = updateCompanyDto.companyTelephone
    const res = await this.companyRepository
      .createQueryBuilder()
      .update(Company)
      .set(updateCompanyDto)
      .where('id = :id', { id }) // Critério de busca usando 'uuid'
      .andWhere('companyTelephone = :companyTelephone', { companyTelephone }) // Critério de busca usando 'am'
      .execute();
    if(res.affected){
      return 200
    }else{
      return 500
    }
  };
  
  remove(id: number) {
    return `This action removes a #${id} company`;
  };
}
