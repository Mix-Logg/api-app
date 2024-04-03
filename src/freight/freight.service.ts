import { Injectable } from '@nestjs/common';
import { CreateFreightDto } from './dto/create-freight.dto';
import { UpdateFreightDto } from './dto/update-freight.dto';
import { RaceService } from 'src/race/race.service';
import { CreateRaceDto } from 'src/race/dto/create-race.dto';
@Injectable()
export class FreightService {
  constructor(
    private raceService: RaceService
  ){}

  async create(createRaceDto: CreateRaceDto) {
    return await this.raceService.create(createRaceDto)
  }

  findAll() {
    console.log('aq')
    return `This action returns all freight`;
  }

  findOne(id: number) {
    console.log('aq')
    return `This action returns a #${id} freight`;
  }

  async update(id: number, updateFreightDto: UpdateFreightDto) {
    return await this.raceService.update(id, updateFreightDto)
  }

  remove(id: number) {
    console.log('aq')
    return `This action removes a #${id} freight`;
  }
}
