import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OperationTodayService } from './operation_today.service';
import { CreateOperationTodayDto } from './dto/create-operation_today.dto';
import { UpdateOperationTodayDto } from './dto/update-operation_today.dto';

@Controller('operation-today')
export class OperationTodayController {
  constructor(private readonly operationTodayService: OperationTodayService) {}

  @Post()
  create(@Body() createOperationTodayDto: CreateOperationTodayDto) {
    return this.operationTodayService.create(createOperationTodayDto);
  }

  @Get('date/:date/:operation')
  findAll(
    @Param('date')      date: string,
    @Param('operation') operation: string,
  ){
    return this.operationTodayService.findAll(date,operation);
  }

  @Get('report/:initial/:finish')
  report(
    @Param('initial') initial: string,
    @Param('finish')  finish: string,
  ) {
    return this.operationTodayService.report(initial, finish);
  }

  @Get(':idDriver')
  findOneToday(@Param('idDriver') idDriver: string) {
    return this.operationTodayService.findOneToday(+idDriver);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOperationTodayDto: UpdateOperationTodayDto) {
    return this.operationTodayService.update(+id, updateOperationTodayDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Body() updateOperationTodayDto: UpdateOperationTodayDto) {
    console.log(updateOperationTodayDto)
    return this.operationTodayService.remove(+id, updateOperationTodayDto);
  }
}
