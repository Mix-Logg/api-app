import { Inject, Injectable } from '@nestjs/common';
import { CreateRaceDto } from './dto/create-race.dto';
import { UpdateRaceDto } from './dto/update-race.dto';
import { Repository } from 'typeorm';
import { Race } from './entities/race.entity';
import Time from '../../hooks/time'

@Injectable()
export class RaceService {
  constructor(
    @Inject('RACE_REPOSITORY') 
    private raceRepository: Repository<Race>,
  ){}

  async create(createRaceDto: CreateRaceDto) {
    const time = Time()
    createRaceDto.create_at = time;
    const response = await this.raceRepository.save(createRaceDto);
    return response.id
  }

  findAll() {
    return this.raceRepository.find();
  }

  findAllOpen(){
    return this.raceRepository.find({ where: { isVisible: '1' } });
  }

  findOne(id: number) {
    return this.raceRepository.findOne({where:{id}});
  }

  async update(id: number, updateRaceDto: UpdateRaceDto) {
    const response = await this.raceRepository.update(id, updateRaceDto);
    if(response.affected){
      return {
        id: id,
      }
    }
    return 500
  }

  remove(id: number) {
    return `This action removes a #${id} race`;
  }
}
