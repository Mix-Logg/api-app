import { Inject, Injectable } from '@nestjs/common';
import { CreateTrainingDto } from './dto/create-training.dto';
import { UpdateTrainingDto } from './dto/update-training.dto';
import { Training } from './entities/training.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TrainingService {
  constructor(
    @Inject('TRAINING_REPOSITORY') 
    private trainingRepository: Repository<Training>,
  ){}

  create(createTrainingDto: CreateTrainingDto) {
    return 'This action adds a new training';
  }

  findAll() {
    return `This action returns all training`;
  }

  findOne(id: number) {
    return `This action returns a #${id} training`;
  }

  update(id: number, updateTrainingDto: UpdateTrainingDto) {
    return `This action updates a #${id} training`;
  }

  remove(id: number) {
    return `This action removes a #${id} training`;
  }
}
