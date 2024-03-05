import { Inject, Injectable } from '@nestjs/common';
import { CreateTourDto } from './dto/create-tour.dto';
import { UpdateTourDto } from './dto/update-tour.dto';
import { Repository } from 'typeorm';
import { Tour } from './entities/tour.entity';

@Injectable()
export class TourService {
  constructor(
    @Inject('TOUR_REPOSITORY') 
    private tourRepository: Repository<Tour>,
  ){}

  async create(createTourDto: CreateTourDto) {
    const response = await this.tourRepository.save(createTourDto);
    return response.id
  }

  findAll() {
    return `This action returns all tour`;
  }

  findOne(id: number) {
    return this.tourRepository.findOne({where:{id}});
  }

  update(id: number, updateTourDto: UpdateTourDto) {
    return `This action updates a #${id} tour`;
  }

  remove(id: number) {
    return `This action removes a #${id} tour`;
  }

  async verifyCpf(cpf: String){
    const res = await this.tourRepository
      .createQueryBuilder("driver")
      .where('cpf = :cpf',  { cpf} )
      .getOne();
    if(res != null){
      return 200
    }
    return 500;
  }
}
