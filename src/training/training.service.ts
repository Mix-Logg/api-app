import { Inject, Injectable } from '@nestjs/common';
import { CreateTrainingDto } from './dto/create-training.dto';
import { UpdateTrainingDto } from './dto/update-training.dto';
import { Training } from './entities/training.entity';
import { IsNull, Repository } from 'typeorm';
import FindTimeSP from 'hooks/time';
import findTimeSP from 'hooks/time';
@Injectable()
export class TrainingService {
  constructor(
    @Inject('TRAINING_REPOSITORY') 
    private trainingRepository: Repository<Training>,
  ){}

  async create(createTrainingDto: CreateTrainingDto) {
    const trainingOpen = await this.findAlltoOneNoDelete(createTrainingDto.uuid, createTrainingDto.am)
    if(Array.isArray(trainingOpen)){
      trainingOpen.map((item)=>{
        this.remove(item.id,{})
      })
    }
    const time = FindTimeSP()
    createTrainingDto.create_at = time;
    const response = await this.trainingRepository.save(createTrainingDto);
    if(response != null){
      return {
        status: 201,
        message:'Successfully created training'
      }
    }
    return {
      status: 500,
      message:'Server error'
    }
  }

  async findAll(){
    const response = await this.trainingRepository.find({
      where: {
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

  async findAllQuitter(){
    const response = await this.trainingRepository.find({
      where:{
        complet : '2',
        delete_at: IsNull()
      }
    });
    let driverData = response
    .filter(item => item.am === "driver")
    .map(item => ({ id: item.uuid, }));
    let auxiliaryData = response
    .filter(item => item.am === "auxiliary")
    .map(item => ({ id: item.uuid, }));
    const driverIds = [...new Set(driverData.map(objeto => objeto.id))];
    const auxiliaryIds = [...new Set(auxiliaryData.map(objeto => objeto.id))];
    return {
      driver:driverIds,
      auxiliary:auxiliaryIds
    }
  }

  async findAllScheduled(){
    const response = await this.trainingRepository.find({
      where:{
        complet : IsNull(),
        delete_at: IsNull()
      }
    });
    let driverData = response
    .filter(item => item.am === "driver")
    .map(item => ({ id: item.uuid, }));
    let auxiliaryData = response
    .filter(item => item.am === "auxiliary")
    .map(item => ({ id: item.uuid, }));
    const driverIds = [...new Set(driverData.map(objeto => objeto.id))];
    const auxiliaryIds = [...new Set(auxiliaryData.map(objeto => objeto.id))];
    return {
      driver:driverIds,
      auxiliary:auxiliaryIds
    }
  }

  async findAllComplet(){
    const response = await this.trainingRepository.find({
      where:{
        complet : '1',
        delete_at: IsNull()
      }
    });
    let driverData = response
    .filter(item => item.am === "driver")
    .map(item => ({ id: item.uuid, }));
    let auxiliaryData = response
    .filter(item => item.am === "auxiliary")
    .map(item => ({ id: item.uuid, }));
    const driverIds = [...new Set(driverData.map(objeto => objeto.id))];
    const auxiliaryIds = [...new Set(auxiliaryData.map(objeto => objeto.id))];
    return {
      driver:driverIds,
      auxiliary:auxiliaryIds
    }
  }

  async findAlltoOne(uuid: number, am :string) {
    const response = await this.trainingRepository.find({
      where: {
        uuid,
        am
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

  async findAlltoOneNoDelete(uuid: number, am :string) {
    const response = await this.trainingRepository.find({
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

  async findOne(id: number) {
    const response = await this.trainingRepository.findOne({
      where: {
        id
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

  async update(id: number, updateTrainingDto: UpdateTrainingDto) {
    const time = findTimeSP()
    updateTrainingDto.update_at = time;
    const res = await this.trainingRepository.update(id, updateTrainingDto);
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

  async remove(id: number, updateTrainingDto: UpdateTrainingDto) {
    const time = findTimeSP()
    updateTrainingDto.delete_at = time;
    const res = await this.trainingRepository.update(id, updateTrainingDto);
    if(res.affected){
      return {
        status: 200,
        message:'Deleted successfully'
      }
    }
      return {
        status: 500,
        message:'Unable to update'
      }
  }
}

