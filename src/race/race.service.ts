import { Inject, Injectable } from '@nestjs/common';
import { CreateRaceDto } from './dto/create-race.dto';
import { UpdateRaceDto } from './dto/update-race.dto';
import { Repository } from 'typeorm';
import { Race } from './entities/race.entity';

@Injectable()
export class RaceService {
  constructor(
    @Inject('RACE_REPOSITORY') 
    private raceRepository: Repository<Race>,
  ){}

  async create(createRaceDto: CreateRaceDto) {
    const response = await this.raceRepository.save(createRaceDto);
    return response.id
  }

  findAll() {
    return this.raceRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} race`;
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
