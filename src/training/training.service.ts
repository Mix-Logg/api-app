import { Inject, Injectable } from '@nestjs/common';
import { CreateTrainingDto } from './dto/create-training.dto';
import { UpdateTrainingDto } from './dto/update-training.dto';
import { Training } from './entities/training.entity';
import { IsNull, Repository } from 'typeorm';
import FindTimeSP from 'hooks/time';
@Injectable()
export class TrainingService {
  constructor(
    @Inject('TRAINING_REPOSITORY') 
    private trainingRepository: Repository<Training>,
  ){}

  async create(createTrainingDto: CreateTrainingDto) {
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

  update(id: number, updateTrainingDto: UpdateTrainingDto) {
    return `This action updates a #${id} training`;
  }

  remove(id: number) {
    return `This action removes a #${id} training`;
  }
}

