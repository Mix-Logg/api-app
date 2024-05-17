import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OperationService } from './operation.service';
import { CreateOperationDto } from './dto/create-operation.dto';
import { UpdateOperationDto } from './dto/update-operation.dto';

@Controller('operation')
export class OperationController {
  constructor(private readonly operationService: OperationService) {}

  @Post()
  create(@Body() createOperationDto: CreateOperationDto) {
    return this.operationService.create(createOperationDto);
  }

  @Get()
  findAll() {
    return this.operationService.findAll();
  }

  @Get(':id/:am')
  findOne(@Param('id') id: number, @Param('am') am: string) {
    return this.operationService.findOne(+id, am);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOperationDto: UpdateOperationDto) {
    return this.operationService.update(+id, updateOperationDto);
  }

  @Patch('delete/:id')
  delete(@Param('id') id: string, @Body() updateOperationDto: UpdateOperationDto) {
    return this.operationService.remove(+id, updateOperationDto);
  }
}
