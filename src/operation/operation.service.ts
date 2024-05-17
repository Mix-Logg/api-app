import { Inject, Injectable } from '@nestjs/common';
import { CreateOperationDto } from './dto/create-operation.dto';
import { UpdateOperationDto } from './dto/update-operation.dto';
import { Operation } from './entities/operation.entity'
import { IsNull, Repository } from 'typeorm';
import findTimeSP from 'hooks/time';
@Injectable()
export class OperationService {
  constructor(
    @Inject('OPERATION_REPOSITORY') 
    private operationRepository: Repository<Operation>,
  ){}

  async create(createOperationDto: CreateOperationDto) {
    const timeCurrect = await findTimeSP()
    createOperationDto.create_at = timeCurrect
    createOperationDto.status = '1'
    const response = await this.operationRepository.save(createOperationDto);
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
  }

  findAll() {
    return `This action returns all operation`;
  }

  async findOne (uuid: number, am:string ) {
    const response = await this.operationRepository.findOne({
      where: {
        uuid,
        am,
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
  }

  async update(id: number, updateOperationDto: UpdateOperationDto) {
    const time = findTimeSP()
    updateOperationDto.update_at = time;
    const res = await this.operationRepository.update(id, updateOperationDto);
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
  }

  async remove(id: number, updateOperationDto: UpdateOperationDto) {
    const time = findTimeSP()
    updateOperationDto.delete_at = time;
    updateOperationDto.status = '0'
    const res = await this.operationRepository.update(id, updateOperationDto);
    if(res.affected){
      return {
        status: 200,
        message:'Delete successfully'
      }
    }
    return {
      status: 500,
      message:'Unable to Delete'
    }
  }
}
