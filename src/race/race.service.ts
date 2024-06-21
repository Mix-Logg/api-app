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

  findAllOpen(type: string) {
    return this.raceRepository.createQueryBuilder('race')
    .where('race.delete_at IS NULL')
    .andWhere('race.vehicleType = :type', { type })
    .getMany();

  }

  async findHistory(id: number) {
    return await this.raceRepository.find({ where: { idClient: id } });
  }

  async findAllHistoryDriver(id: number) {
    return await this.raceRepository.find({ where: { idDriver: id } });
  }

  findOne(id: number) {
    return this.raceRepository.findOne({ where: { id } });
  }

  async update(id: number, updateRaceDto: UpdateRaceDto) {
    const res = await this.findOne(id);
    if (!res) {
      return {
        status: 500,
        msg: 'Race not found',
      };
    }

    if (
      updateRaceDto.confirmCodeInitial !== undefined &&
      res.codeInitial !== updateRaceDto.confirmCodeInitial
    ) {
      return {
        status: 500,
        msg: 'Code Initial not the same',
      };
    }

    if (
      updateRaceDto.confirmCodeFinish !== undefined &&
      res.codeFinish !== updateRaceDto.confirmCodeFinish
    ) {
      return {
        status: 500,
        msg: 'Code Finish not the same',
      };
    }

    if (updateRaceDto.confirmCodeInitial !== undefined) {
      updateRaceDto.confirmCodeInitial = Time();
    }

    if (updateRaceDto.confirmCodeFinish !== undefined) {
      updateRaceDto.confirmCodeFinish = Time();
    }

    const response = await this.raceRepository.update(id, updateRaceDto);
    if (response.affected) {
      return {
        status: 200,
        msg: 'Successful update',
      };
    }
    return {
      status: 500,
      msg: 'Failed to update',
    };
  }

  async updateSimple(id: number, updateRaceDto: UpdateRaceDto) {
    const response = await this.raceRepository.update(id, updateRaceDto);
    if (response.affected) {
      return {
        status: 200,
        msg: 'Successful update',
      };
    }
    return {
      status: 500,
      msg: 'Failed to update',
    };
  }

  async remove(id: number) {
    try {
      const updateRaceDto: UpdateRaceDto = { delete_at: Time() };
      await this.raceRepository.update(id, updateRaceDto);
      console.log('caiu aqui')
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
