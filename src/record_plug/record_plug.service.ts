import { Inject, Injectable } from '@nestjs/common';
import { CreateRecordPlugDto } from './dto/create-record_plug.dto';
import { UpdateRecordPlugDto } from './dto/update-record_plug.dto';
import { Repository } from 'typeorm';
import { RecordPlug } from './entities/record_plug.entity';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class RecordPlugService {
  constructor(
    @Inject('RECORDPLUG_REPOSITORY')
    private recordPlugRepository: Repository<RecordPlug>,
  ) {}

  async create(recordPlugRepository: CreateRecordPlugDto) {
    const res = await this.recordPlugRepository.save(recordPlugRepository);
    return res;
  }

  findAll() {
    return this.recordPlugRepository.find();
  }

  async findOne(uuid: number, am: string) {
    return this.recordPlugRepository.findOne({ where: { uuid, am } });
  }

  async update(
    id: number,
    updateRecordPlugDto: UpdateRecordPlugDto,
  ) {
    const res = await this.recordPlugRepository.update(id, updateRecordPlugDto);
  }

  remove(id: number) {
    return `This action removes a #${id} recordPlug`;
  }
}
