import { Inject, Injectable } from '@nestjs/common';
import { CreateRecordPlugDto } from './dto/create-record_plug.dto';
import { UpdateRecordPlugDto } from './dto/update-record_plug.dto';
import { Repository } from 'typeorm';
import { RecordPlug } from './entities/record_plug.entity'; 

@Injectable()
export class RecordPlugService {

  constructor(
    @Inject('RECORDPLUG_REPOSITORY') 
    private recordPlugRepository: Repository<RecordPlug>,
  ){}

 async  create(recordPlugRepository: CreateRecordPlugDto) {
    const res = await this.recordPlugRepository.save(recordPlugRepository);
     return res
  }

  findAll() {
    return this.recordPlugRepository.find();
  }

   findOne(uuid: number, am:string) {
    return this.recordPlugRepository.find({ where: { uuid, am } }); 
  }

  update(id: number, updateRecordPlugDto: UpdateRecordPlugDto) {
    return `This action updates a #${id} recordPlug`;
  }

  remove(id: number) {
    return `This action removes a #${id} recordPlug`;
  }
}
