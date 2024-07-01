import { Inject, Injectable } from '@nestjs/common';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { Team } from './entities/team.entity';
import { Repository } from 'typeorm';
import { VehicleService } from 'src/vehicle/vehicle.service';
import { DriverService } from 'src/driver/driver.service';
import { AuxiliaryService } from 'src/auxiliary/auxiliary.service';
import FindTimeSP from 'hooks/time';

@Injectable()
export class TeamService {
  
  constructor(
    @Inject('TEAM_REPOSITORY')
    private teamRepository: Repository<Team>,
    private vehicleService: VehicleService,
    private driverService : DriverService,
    private auxiliaryService: AuxiliaryService
  ) {}

  async create(createTeamDto: CreateTeamDto) {
    const time = FindTimeSP()
    createTeamDto.create_at = time;
    const response = await this.teamRepository.save(createTeamDto);
    if(response != null){
      return {
        status:201,
        message:'Successfully created team'
      }
    }
    return {
      status: 500,
      message:'Server error'
    }
  }

  async findAll() {
    let allTeams = []
    const teams = await this.teamRepository.find();
    await Promise.all(
      teams.map(async (team) => {
        const vehicle   = await this.vehicleService.findOneId(team.id_vehicle);
        const driver    = await this.driverService.findOne(team.id_driver);
        const auxiliary = await this.auxiliaryService.findOne(team.id_auxiliary);
        let group = {
          id: team.id,
          driverName: driver.name,
          auxiliaryName: auxiliary.name,
          vehicle: vehicle.type,
          plate:vehicle.plate
        }
        allTeams.push(group)
      })
    )
    return allTeams;
  }

  async report() {
    let allTeams = []
    const teams = await this.teamRepository.find();
    await Promise.all(
      teams.map(async (team) => {
        const vehicle   = await this.vehicleService.findOneId(team.id_vehicle);
        const driver    = await this.driverService.findOne(team.id_driver);
        const auxiliary = await this.auxiliaryService.findOne(team.id_auxiliary);
        const create = new Date(team.create_at)
        const day     = create.getUTCDate();
        const month   = create.getUTCMonth() + 1; 
        const year    = create.getUTCFullYear();
        const date    = `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`;
        let group = {
          create:date,
          id: team.id,
          driverName: driver.name,
          auxiliaryName: auxiliary.name,
          vehicle: vehicle.type,
          plate  : vehicle.plate
        }
        allTeams.push(group)
      })
    )
    return allTeams;
  }

  async findOne(id_driver: number) {
    const team = await this.teamRepository.createQueryBuilder('team')
    .where('team.delete_at IS NULL AND team.id_driver = :id_driver', { id_driver })
    .getMany();
    const vehicle   = await this.vehicleService.findOneId(team[0].id_vehicle);
    const driver    = await this.driverService.findOne(team[0].id_driver);
    const auxiliary = await this.auxiliaryService.findOne(team[0].id_auxiliary);
    const datesTeam = {
      id         : team[0].id,
      idAuxiliary: team[0].id_auxiliary,
      idDriver   : team[0].id_driver,
      nameDriver : driver.name,
      nameAuxiliary: auxiliary.name,
      vehicle: vehicle.type
    }
    return datesTeam;
  }

  update(id: number, updateTeamDto: UpdateTeamDto) {
    return `This action updates a #${id} team`;
  }

  remove(id: number) {
    return `This action removes a #${id} team`;
  }
}
