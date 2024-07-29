import { Inject, Injectable } from '@nestjs/common';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { Team } from './entities/team.entity';
import { IsNull, Repository } from 'typeorm';
import { VehicleService } from 'src/vehicle/vehicle.service';
import { DriverService } from 'src/driver/driver.service';
import { AuxiliaryService } from 'src/auxiliary/auxiliary.service';
import { OperationService } from 'src/operation/operation.service';
import FindTimeSP from 'hooks/time';
import findTimeSP from 'hooks/time';

@Injectable()
export class TeamService {
  
  constructor(
    @Inject('TEAM_REPOSITORY')
    private teamRepository: Repository<Team>,
    private vehicleService: VehicleService,
    private driverService : DriverService,
    private auxiliaryService: AuxiliaryService,
    private operationService: OperationService
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
    const teams = await this.teamRepository.find({
      where:{
        delete_at: IsNull()
      }
    });
    await Promise.all(
      teams.map(async (team) => {
        const vehicle   = await this.vehicleService.findOneId(team.id_vehicle);
        const driver    = await this.driverService.findOne(team.id_driver);
        const auxiliary = await this.auxiliaryService.findOne(team.id_auxiliary);
        const operation = await this.operationService.findOne(team.id_driver, 'driver')
        let nameAuxiliary:string
        if ('status' in auxiliary && 'message' in auxiliary) {
          nameAuxiliary =' Não tem auxiliar'
        }else{
          nameAuxiliary = auxiliary.name
        }
        let group = {
          operation    : operation.status == 500 ? 'Não tem operação' : operation, 
          create       : team.create_at,
          id           : team.id,
          driverName   : driver.name,
          auxiliaryName: team.id_auxiliary ? nameAuxiliary : ' Não tem auxiliar',
          vehicle      : vehicle.type,
          plate        : vehicle.plate
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
        let nameAuxiliary:string
        if ('status' in auxiliary && 'message' in auxiliary) {
          nameAuxiliary =' Não tem auxiliar'
        }else{
          nameAuxiliary = auxiliary.name
        }
        let group = {
          create:date,
          id: team.id,
          driverName: driver.name,
          auxiliaryName: team.id_auxiliary ? nameAuxiliary : ' Não tem auxiliar',
          vehicle: vehicle.type,
          plate  : vehicle.plate
        }
        allTeams.push(group)
      })
    )
    return allTeams;
  }

  async findOneById(id: number) {
    const team      = await this.teamRepository.findOne(
      {
        where:{
          id: id,
          delete_at: IsNull() 
        }
      });
    const vehicle   = await this.vehicleService.findOneId(team.id_vehicle);
    const driver    = await this.driverService.findOne(team.id_driver);
    const auxiliary = await this.auxiliaryService.findOne(team.id_auxiliary);
    let nameAuxiliary:string
    if ('status' in auxiliary && 'message' in auxiliary) {
      nameAuxiliary =' Não tem auxiliar'
    }else{
      nameAuxiliary = auxiliary.name
    }

    const datesTeam = {
      id         : team.id,
      idAuxiliary: team.id_auxiliary,
      idDriver   : team.id_driver,
      nameDriver : driver.name,
      nameAuxiliary: team.id_auxiliary ? nameAuxiliary : ' Não tem auxiliar',
      vehicle: vehicle.type,
      plate  : vehicle.plate
    }
    return datesTeam;
  }

  async findOne(id_driver: number) {
    const team = await this.teamRepository.createQueryBuilder('team')
    .where('team.delete_at IS NULL AND team.id_driver = :id_driver', { id_driver })
    .getMany();
    const vehicle   = await this.vehicleService.findOneId(team[0].id_vehicle);
    const driver    = await this.driverService.findOne(team[0].id_driver);
    const auxiliary = await this.auxiliaryService.findOne(team[0].id_auxiliary);
    let nameAuxiliary:string
        if ('status' in auxiliary && 'message' in auxiliary) {
          nameAuxiliary =' Não tem auxiliar'
        }else{
          nameAuxiliary = auxiliary.name
        }
    const datesTeam = {
      id         : team[0].id,
      idAuxiliary: team[0].id_auxiliary,
      idDriver   : team[0].id_driver,
      nameDriver : driver.name,
      nameAuxiliary:  team[0].id_auxiliary ? nameAuxiliary : ' Não tem auxiliar',
      vehicle: vehicle.type
    }
    return datesTeam;
  }

  async update(id: number, updateTeamDto: UpdateTeamDto) {
    const time = findTimeSP()
    updateTeamDto.update_at = time;
    const res = await this.teamRepository.update(id, updateTeamDto);
    if(res.affected){
      return {
        status: 200,
        message:'Updated successfully'
      }
    }
      return {
        status: 500,
        message:'Unable to update'
      }
  }

  async remove(id: number, updateTeamDto:UpdateTeamDto) {
    const time = findTimeSP()
    updateTeamDto.delete_at = time;
    const res = await this.teamRepository.update(id, updateTeamDto);
    if(res.affected){
      return {
        status: 200,
        message:'Updated successfully'
      }
    }
    return {
      status: 500,
      message:'Unable to update'
    }
  }
}
