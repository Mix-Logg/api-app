import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RaceService } from './race.service';
import { CreateRaceDto } from './dto/create-race.dto';
import { UpdateRaceDto } from './dto/update-race.dto';

@Controller('race')
export class RaceController {
  constructor(private readonly raceService: RaceService) {}

  @Post()
  create(@Body() createRaceDto: CreateRaceDto) {
    return this.raceService.create(createRaceDto);
  }

  @Get()
  findAllActive() {
    return this.raceService.findAllActive();
  }

  @Get('open/:type')
  findAllOpen( @Param('type') type: string ) {
    return this.raceService.findAllOpen(type);
  }

  @Get('history/delivery/:id')
  findAllHistory( @Param('id') id: number ) {
    return this.raceService.findAllHistoryDriver(+id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.raceService.findOne(+id);
  }

  @Get('history/:id')
  findHistory(@Param('id') id: string) {
    return this.raceService.findHistory(+id);
  }
  
  @Patch('simple/:id')
  updateSimple(@Param('id') id: string, @Body() updateRaceDto: UpdateRaceDto) {
    return this.raceService.updateSimple(+id, updateRaceDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRaceDto: UpdateRaceDto) {
    return this.raceService.update(+id, updateRaceDto);
  }


  @Delete(':id')
  remove(@Param('id') id: number ) {
    return this.raceService.remove(+id);
  }
}
