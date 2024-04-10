import { Inject, Injectable } from '@nestjs/common';
import { CreateRaceDto } from './dto/create-race.dto';
import { UpdateRaceDto } from './dto/update-race.dto';
import { Repository } from 'typeorm';
import { Race } from './entities/race.entity';
import Time from '../../hooks/time';

@Injectable()
export class RaceService {
  constructor(
    @Inject('RACE_REPOSITORY')
    private raceRepository: Repository<Race>,
  ) {}

  async create(createRaceDto: CreateRaceDto) {
    var codesInitial = [];
    for (var i = 0; i < 4; i++) {
      codesInitial.push(Math.floor(Math.random() * 10));
    }
    var codesFinish = [];
    for (var i = 0; i < 4; i++) {
      codesFinish.push(Math.floor(Math.random() * 10));
    }

    const time = Time();
    createRaceDto.codeInitial = codesInitial.join('');
    createRaceDto.codeFinish = codesFinish.join('');
    createRaceDto.create_at = time;
    const response = await this.raceRepository.save(createRaceDto);
    return response;
  }

  findAll() {
    return this.raceRepository.find();
  }

  findAllOpen() {
    return this.raceRepository.find({ where: { isVisible: '1' } });
  }

  async findHistory(id: number) {
    return await this.raceRepository.find({ where: { idClient: id } });
  }

  findOne(id: number) {
    return this.raceRepository.findOne({ where: { id } });
  }

  async update(id: number, updateRaceDto: UpdateRaceDto) {
    const response = await this.raceRepository.update(id, updateRaceDto);
    if (response.affected) {
      return {
        status: 200,
        msg: 'Successful update'
      };
    }
    return 500;
  }

  async remove(id: number) {
    try {
      const updateRaceDto: UpdateRaceDto = { delete_at: Time() };
      await this.raceRepository.update(id, updateRaceDto);
      return {
        msg: 'successful',
        status: 200,
      };
    } catch (e) {
      return {
        msg: ' Error servidor internal ',
        status: 500,
      };
    }
  }
}
