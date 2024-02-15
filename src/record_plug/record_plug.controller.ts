import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RecordPlugService } from './record_plug.service';
import { CreateRecordPlugDto } from './dto/create-record_plug.dto';
import { UpdateRecordPlugDto } from './dto/update-record_plug.dto';

@Controller('record-plug')
export class RecordPlugController {
  constructor(private readonly recordPlugService: RecordPlugService) {}

  @Post()
  create(@Body() createRecordPlugDto: CreateRecordPlugDto) {
    return this.recordPlugService.create(createRecordPlugDto);
  }

  @Get()
  findAll() {
    return this.recordPlugService.findAll();
  }

  @Get(':uuid/:am/')
  findOne(@Param('uuid') uuid: number, @Param('am') am: string) {
    return this.recordPlugService.findOne(uuid, am);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateRecordPlugDto: UpdateRecordPlugDto,
  ) {
    return this.recordPlugService.update(+id,updateRecordPlugDto,);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.recordPlugService.remove(+id);
  }
}
