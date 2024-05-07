import { Inject, Injectable } from '@nestjs/common';
import { CreateRecordPlugDto } from './dto/create-record_plug.dto';
import { UpdateRecordPlugDto } from './dto/update-record_plug.dto';
import { Repository } from 'typeorm';
import { RecordPlug } from './entities/record_plug.entity';
import { DriverService } from 'src/driver/driver.service';


@Injectable()
export class RecordPlugService {
  constructor(
    @Inject('RECORDPLUG_REPOSITORY')
    private recordPlugRepository: Repository<RecordPlug>,
    private readonly driverService: DriverService
  ) {}

  async create(recordPlugRepository: CreateRecordPlugDto) {
    const res = await this.recordPlugRepository.save(recordPlugRepository);
    return res;
  }

  findAll() {
    return this.recordPlugRepository.find();
  }

  async findTimelineDriver() {
    let plugPeoples = []; 
    const drivers = await this.driverService.findAll();
    await Promise.all(
      drivers.map(async (driver) => {
        let plug = await this.findOne(driver.id, 'driver');
        if (plug != 500 && plug && typeof plug !== 'number') {
          const params = {
                aproved: plug.aproved,
                step: plug.timeline
          };
          const plugPeople = {
            id: driver.id,
            plug: params
          };
          return plugPeoples.push(plugPeople);
        } 
        const plugPeople = {
          id: driver.id,
          plug: driver.cadastralStatus
        };
        plugPeoples.push(plugPeople);
      })
    );
    return plugPeoples;
}


  async findOne(uuid: number, am: string) {
    const res = await this.recordPlugRepository.findOne({ where: { uuid, am } });
    if(res != null){
      return res
    }else{
      return 500
    }
  }

  async update(
    id: number,
    updateRecordPlugDto: UpdateRecordPlugDto,
  ) {
    const res = await this.recordPlugRepository.update(id, updateRecordPlugDto);
    if(res.affected === 1){
      return 200
    }else{
      return 500
    }
  }

  remove(id: number) {
    return `This action removes a #${id} recordPlug`;
  }
}
