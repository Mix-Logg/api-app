import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TeamService } from './team.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';

@Controller('team')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Post()
  create(@Body() createTeamDto: CreateTeamDto) {
    return this.teamService.create(createTeamDto);
  }

  @Get()
  findAll() {
    return this.teamService.findAll();
  }

  @Get(':id')
  findOneById(@Param('id') id: string) {
    return this.teamService.findOneById(+id);
  }

  @Get('/report')
  report() {
    return this.teamService.report();
  }

  @Get('operation/:idDriver')
  findOneByIdDriver(@Param('idDriver') id: string) {
    return this.teamService.findOne(+id);
  }


  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTeamDto: UpdateTeamDto) {
    return this.teamService.update(+id, updateTeamDto);
  }

  @Patch('delete/:id')
  remove(@Param('id') id: string, @Body() updateTeamDto: UpdateTeamDto) {
    return this.teamService.remove(+id,updateTeamDto);
  }
}
