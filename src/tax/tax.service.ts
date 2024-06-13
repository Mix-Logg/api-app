import { Inject, Injectable } from '@nestjs/common';
import { CreateTaxDto } from './dto/create-tax.dto';
import { UpdateTaxDto } from './dto/update-tax.dto';
import { Repository } from 'typeorm';
import { Tax } from './entities/tax.entity';
import findTimeSP from 'hooks/time';
@Injectable()
export class TaxService {
  constructor(
  @Inject('TAX_REPOSITORY')
  private taxRepository: Repository<Tax>,
  ) {}

  create(createTaxDto: CreateTaxDto) {
    return 'This action adds a new tax';
  }

  async findAll() {
    return await this.taxRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} tax`;
  }

  async update(id: number, updateTaxDto: UpdateTaxDto) {
    const time = await findTimeSP()
    updateTaxDto.update_at = time;
    const response = await this.taxRepository.update(id, updateTaxDto);
    if(response.affected === 1){
      return {
        status:200,
        message:'Updated tax successfully'
      }
    }
    return {
      status:500,
      message:'Error server internal'
    }
  }

  remove(id: number) {
    return `This action removes a #${id} tax`;
  }
}
