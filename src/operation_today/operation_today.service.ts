import { Inject, Injectable } from '@nestjs/common';
import { CreateOperationTodayDto } from './dto/create-operation_today.dto';
import { UpdateOperationTodayDto } from './dto/update-operation_today.dto';
import { OperationToday } from './entities/operation_today.entity';
import { VehicleService } from 'src/vehicle/vehicle.service';
import { Between, IsNull, Repository } from 'typeorm';
import Mask from 'hooks/mask';
import findTimeSP from 'hooks/time';

@Injectable()
export class OperationTodayService {
  constructor(
    @Inject('OPERATIONTODAY_REPOSITORY') 
    private operationTodayRepository: Repository<OperationToday>,
    private vehicleService: VehicleService,
  ){}

  async create(createOperationTodayDto: CreateOperationTodayDto) {
    const timeCurrect = await findTimeSP();
    createOperationTodayDto.create_at = timeCurrect;
    const response  = await this.operationTodayRepository.save(createOperationTodayDto);
    if(response.id != null){
      return{
        status:201,
        message:'Successfully created'
      }
    }
    return{
      status: 500,
      message:'Error creating'
    }
  };

  async findAll(date:string, operation:string) {
    const response = await this.operationTodayRepository.find({
      where: {
        date,
        operation
      }
    });
    if(response != null){
      return response
    }
    return {
      status: 500,
      message: 'Registereds not found'
    }
  };

  async findOneToday(idDriver: number) {
    const response = await this.operationTodayRepository.findOne({
      where: {
        idDriver,
        delete_at: IsNull()
      }
    });
    if(response != null){
      return response
    }
    return {
      status: 500,
      message: 'Registered not found'
    }
  };

  async update(id: number, updateOperationTodayDto: UpdateOperationTodayDto) {
    const time = findTimeSP()
    updateOperationTodayDto.update_at = time;
    const res = await this.operationTodayRepository.update(id, updateOperationTodayDto);
    if(res.affected){
      return {
        status: 200,
        message:'Updated successfully'
      }
    }
    return {
      status: 500,
      message:'Unable to update'
    }
  };

  async remove(id: number, updateOperationTodayDto: UpdateOperationTodayDto) {
    if (!id || typeof id !== 'number') {
      return {
        status: 400,
        message: 'Invalid ID'
      };
    }
    if (!updateOperationTodayDto || typeof updateOperationTodayDto !== 'object') {
      return {
        status: 400,
        message: 'Invalid data'
      };
    }
    try {
      const time = findTimeSP();
      updateOperationTodayDto.delete_at = time;
      const res = await this.operationTodayRepository.update(id, updateOperationTodayDto);
      if (res.affected) {
        return {
          status: 200,
          message: 'Deleted successfully'
        };
      }
      return {
        status: 500,
        message: 'Unable to delete'
      };
    } catch (error) {
      console.error('Error deleting operation:', error);
      return {
        status: 500,
        message: 'An error occurred while trying to delete the operation'
      };
    }
  };

  async report(initial:string ,finish:string) {
    let allOperation = []
    const operations =  await this.operationTodayRepository.query(`
      SELECT * FROM operation_today
       WHERE STR_TO_DATE(date, '%d/%m/%Y') BETWEEN STR_TO_DATE(?, '%d/%m/%Y') AND STR_TO_DATE(?, '%d/%m/%Y')
    `, [Mask('date',initial), Mask('date',finish)]);
    await Promise.all(
      operations.map( async (operation) => {
        const vehicle = await this.vehicleService.findOne(operation.idDriver, 'driver');
        const peoples = JSON.parse(operation.team)
        const cubing  = JSON.parse(vehicle.cubing) 
        let report = {
          date   : operation.date,
          status : operation.status,
          start  : operation.start,
          plate  : vehicle.plate,
          vehicleType   : vehicle.type == 'util' ? 'Fiorino' : Mask('capitalize', vehicle.type),
          trackerBrand  : vehicle.trackerBrand,
          cubing        : cubing ? `${cubing.altura}x${cubing.largura}x${cubing.comprimento}` : '',
          driver     : Mask('capitalize', peoples.driver),
          auxiliary  : Mask('capitalize', peoples.auxiliary),
          operation  : operation.operation,
          occurrence : operation.occurrence,
        }
        allOperation.push(report)
      })
    );
    return allOperation;
  };
  
}
