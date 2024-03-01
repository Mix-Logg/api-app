import { Inject, Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Company } from './entities/company.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CompanyService {
  constructor(
    @Inject('COMPANY_REPOSITORY')
    private companyRepository: Repository<Company>,
  ) {}
  async create(createCompanyDto: CreateCompanyDto) {
    const response = await this.companyRepository.save(createCompanyDto);
    if (response != null) {
      return 200;
    }
    return 500;
  }

  findAll() {
    return this.companyRepository.find();
  }

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
      console.log(obj);
      return obj;
    }

    return 200;
  }


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
  }
  
  remove(id: number) {
    return `This action removes a #${id} company`;
  }
}
