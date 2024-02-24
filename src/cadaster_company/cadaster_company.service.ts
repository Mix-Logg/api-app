import { Inject, Injectable } from '@nestjs/common';
import { CreateCadasterCompanyDto } from './dto/create-cadaster_company.dto';
import { UpdateCadasterCompanyDto } from './dto/update-cadaster_company.dto';
import { CadasterCompany } from './entities/cadaster_company.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CadasterCompanyService {

  constructor(
    @Inject('CADASTERCOMPANY_REPOSITORY') 
    private cadasterCompanyRepository: Repository<CadasterCompany>,
  ) {}

  async create(createCadasterCompanyDto: CreateCadasterCompanyDto) {
    const cadasterCompany = this.cadasterCompanyRepository.create({
      ...createCadasterCompanyDto,
      companyTelephone: createCadasterCompanyDto.companyTelephone.toString(),
    });

    const res = await this.cadasterCompanyRepository.save(cadasterCompany);
    return res;
  }

  findAll() {
    return this.cadasterCompanyRepository.find();
  }

  async findOne(uuid: number, companyTelephone?: number) {
    const res = await this.cadasterCompanyRepository.findOne({
      where: { uuid, companyTelephone: companyTelephone?.toString() }
    });
  
    if (res !== null) {
      return res;
    } else {
      return 500;
    }
  }

  update(id: number, updateCadasterCompanyDto: UpdateCadasterCompanyDto) {
    return `This action updates a #${id} cadasterCompany`;
  }

  remove(id: number) {
    return `This action removes a #${id} cadasterCompany`;
  }
}
