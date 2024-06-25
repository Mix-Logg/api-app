import { Inject, Injectable } from '@nestjs/common';
import { CreateRaceDriverCancelDto } from './dto/create-race_driver-cancel.dto';
import { UpdateRaceDriverCancelDto } from './dto/update-race_driver-cancel.dto';
import { Repository } from 'typeorm';
import { RaceDriverCancel } from './entities/race_driver-cancel.entity';
import { TaxService } from 'src/tax/tax.service';
import FindTimeSP from 'hooks/time';
@Injectable()
export class RaceDriverCancelService {
  constructor(
    @Inject('RACEDRIVERCANCEL_REPOSITORY')
    private raceDriverCancel: Repository<RaceDriverCancel>,
    private taxService: TaxService,
  ) {}

  async create(createRaceDriverCancelDto: CreateRaceDriverCancelDto) {
    const time = await FindTimeSP();
    const taxs = await this.taxService.findAll();
    createRaceDriverCancelDto.tax = taxs[0].driver_cancel
    createRaceDriverCancelDto.create_at = time
    return await this.raceDriverCancel.save(createRaceDriverCancelDto);
  }

  findAll() {
    return `This action returns all raceDriverCancel`;
  }

  async findOne(am:string ,idDelivery: number) {
    const user = await this.raceDriverCancel.findOne({
      where: {
        am, 
        idDelivery 
      }
    });
    if(user === null){
      return 500
    }else{
      return user
    }
  }

  update(id: number, updateRaceDriverCancelDto: UpdateRaceDriverCancelDto) {
    return `This action updates a #${id} raceDriverCancel`;
  }

  remove(id: number) {
    return `This action removes a #${id} raceDriverCancel`;
  }
}
