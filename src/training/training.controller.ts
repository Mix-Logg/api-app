import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TrainingService } from './training.service';
import { CreateTrainingDto } from './dto/create-training.dto';
import { UpdateTrainingDto } from './dto/update-training.dto';

@Controller('training')
export class TrainingController {
  constructor(private readonly trainingService: TrainingService) {}

  @Post()
  create(@Body() createTrainingDto: CreateTrainingDto) {
    return this.trainingService.create(createTrainingDto);
  }

  @Get()
  findAll() {
    return this.trainingService.findAll();
  }

  @Get('all/findAllQuitter')
  findAllQuitter() {
    return this.trainingService.findAllQuitter();
  }

  @Get('all/findAllScheduled')
  findAllScheduled() {
    return this.trainingService.findAllScheduled();
  }

  @Get('all/findAllComplet')
  findAllComplet() {
    return this.trainingService.findAllComplet();
  }
  
  @Get('all/:uuid/:am')
  findAlltoOne(@Param('uuid') uuid: number, @Param('am') am: string) {
    return this.trainingService.findAlltoOne(uuid, am);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.trainingService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTrainingDto: UpdateTrainingDto) {
    return this.trainingService.update(+id, updateTrainingDto);
  }

  @Patch('delete/:id')
  remove(@Param('id') id: string, @Body() updateTrainingDto: UpdateTrainingDto) {
    return this.trainingService.remove(+id, updateTrainingDto);
  }
}
