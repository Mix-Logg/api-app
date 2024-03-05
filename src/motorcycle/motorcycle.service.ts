import { Inject, Injectable } from '@nestjs/common';
import { CreateMotorcycleDto } from './dto/create-motorcycle.dto';
import { UpdateMotorcycleDto } from './dto/update-motorcycle.dto';
import { Motorcycle } from './entities/motorcycle.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MotorcycleService {
  
  constructor(
    @Inject('MOTORCYCLE_REPOSITORY') 
    private motorcycleRepository: Repository<Motorcycle>,
  ){}
  
  async create(createMotorcycleDto: CreateMotorcycleDto) {
    const response = await this.motorcycleRepository.save(createMotorcycleDto);
    return response.id
  }

  findAll() {
    return `This action returns all motorcycle`;
  }

  findOne(id: number) {
    return this.motorcycleRepository.findOne({where:{id}});
  }

  update(id: number, updateMotorcycleDto: UpdateMotorcycleDto) {
    return `This action updates a #${id} motorcycle`;
  }

  remove(id: number) {
    return `This action removes a #${id} motorcycle`;
  }

  async verifyCpf(cpf: String){
    const res = await this.motorcycleRepository
      .createQueryBuilder("driver")
      .where('cpf = :cpf',  { cpf} )
      .getOne();
    if(res != null){
      return 200
    }
    return 500;
  }
}
