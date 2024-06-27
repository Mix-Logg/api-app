import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RaceDriverCancelService } from './race_driver-cancel.service';
import { CreateRaceDriverCancelDto } from './dto/create-race_driver-cancel.dto';
import { UpdateRaceDriverCancelDto } from './dto/update-race_driver-cancel.dto';

@Controller('race-driver-cancel')
export class RaceDriverCancelController {
  constructor(private readonly raceDriverCancelService: RaceDriverCancelService) {}

  @Post()
  create(@Body() createRaceDriverCancelDto: CreateRaceDriverCancelDto) {
    return this.raceDriverCancelService.create(createRaceDriverCancelDto);
  }

  @Get()
  findAll() {
    return this.raceDriverCancelService.findAll();
  }

  @Get(':id/:am')
  findAllDelivery(
    @Param('id') id: number,
    @Param('am') am: string
  ) {
    return this.raceDriverCancelService.findAllDelivery(am, id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRaceDriverCancelDto: UpdateRaceDriverCancelDto) {
    return this.raceDriverCancelService.update(+id, updateRaceDriverCancelDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.raceDriverCancelService.remove(+id);
  }
}
