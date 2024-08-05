import { Inject, Injectable } from '@nestjs/common';
import { CreateRecordPlugDto } from './dto/create-record_plug.dto';
import { UpdateRecordPlugDto } from './dto/update-record_plug.dto';
import { Repository } from 'typeorm';
import { RecordPlug } from './entities/record_plug.entity';
import { DriverService } from 'src/driver/driver.service';
import { AuxiliaryService } from 'src/auxiliary/auxiliary.service';
import findTimeSP from 'hooks/time';
@Injectable()
export class RecordPlugService {
  constructor(
    @Inject('RECORDPLUG_REPOSITORY')
    private recordPlugRepository: Repository<RecordPlug>,
    private readonly driverService: DriverService,
    private readonly auxiliaryService: AuxiliaryService
  ) {}

  async create(recordPlugRepository: CreateRecordPlugDto) {
    const res = await this.recordPlugRepository.save(recordPlugRepository);
    return res;
  }

  findAll() {
    return this.recordPlugRepository.find();
  }

  async findWhere(where: string,  value: string, where2?: string,  value2?: string){
    const res = await this.recordPlugRepository.find({ where: { 
      [where]:value,
      [where2]:value2
    } });
    let driverData = res
    .filter(item => item.am === "driver")
    .map(item => ({ id: item.uuid, }));
    let auxiliaryData = res
    .filter(item => item.am === "auxiliary")
    .map(item => ({ id: item.uuid, }));
    const driverIds = await Promise.all(
      driverData.map(async (driver) => {  
        const response = await this.driverService.findOne(driver.id);
        if (!response.delete_at) {
          return driver.id;
        }
        return null; 
      })
    );
    // const auxiliaryIds = await auxiliaryData.map(objeto => objeto.id);
    const auxiliaryIds = await Promise.all(
      auxiliaryData.map(async (auxiliary) => {  
        const response = await this.auxiliaryService.findOne(auxiliary.id);
        if ('delete_at' in response && !response.delete_at) {
          return auxiliary.id;
        }
        return null; 
      })
    );
    return {
      driver:driverIds,
      auxiliary:auxiliaryIds
    }
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

  async findTimelineAuxiliary() {
    let plugPeoples = []; 
    const auxiliarys = await this.auxiliaryService.findAll();
    await Promise.all(
      auxiliarys.map(async (auxiliary) => {
        let plug = await this.findOne(auxiliary.id, 'auxiliary');
        if (plug != 500 && plug && typeof plug !== 'number') {
          const params = {
                aproved: plug.aproved,
                step: plug.timeline
          };
          const plugPeople = {
            id: auxiliary.id,
            plug: params
          };
          return plugPeoples.push(plugPeople);
        } 
        const plugPeople = {
          id: auxiliary.id,
          plug: auxiliary.cadastralStatus
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
    const date = await findTimeSP();
    updateRecordPlugDto.update_at = date;
    const res = await this.recordPlugRepository.update(id, updateRecordPlugDto);
    if(res.affected === 1){
      return 200
    }else{
      return 500
    }
  }

  async findAccepted(){
    const auxilairy  = await this.auxiliaryService.findAccepted()
    const drivers = await this.driverService.findAccepted()
    const plugs = await this.findAll()
    const plugDriversUuids = new Set(plugs.filter(item => item.am === 'driver').map(item => item.uuid));
    const plugAuxiliariesUuids = new Set(plugs.filter(item => item.am === 'auxiliary').map(item => item.uuid));
  
    // Filtrar motoristas e auxiliares que não estão na plug
    const naoEstaNaPlugDriver = drivers.filter(driver => !plugDriversUuids.has(driver.id));
    const naoEstaNaPlugAuxiliary = auxilairy.filter(auxiliary => !plugAuxiliariesUuids.has(auxiliary.id));
  
    return {
      driver   :naoEstaNaPlugDriver,
      auxiliary:naoEstaNaPlugAuxiliary
    };
  }

  remove(id: number) {
    return `This action removes a #${id} recordPlug`;
  }
}
