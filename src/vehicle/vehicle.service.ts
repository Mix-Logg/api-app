import { Inject, Injectable } from '@nestjs/common';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateAntt } from './dto/update-antt-vehicle.dto';
import { UpdateClv } from './dto/update-clv-vehicle.dto';
import { UpdateOwner, UpdateCnpjOwner, UpdateLegalOwner  } from './dto/update-owner-vehicle.dto'
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { Vehicle } from './entities/vehicle.entity';
import { Repository } from 'typeorm';
import { UpdateAddressDto } from './dto/update-address-dto';
import { DriverService } from 'src/driver/driver.service';
import { RecordPlugService } from 'src/record_plug/record_plug.service';
@Injectable()
export class VehicleService {
  constructor(
    @Inject('VEHICLE_REPOSITORY') 
    private vehicleRepository: Repository<Vehicle>,
    private readonly driverService : DriverService,
    private readonly plugService : RecordPlugService
  ){}
  
  create(createVehicleDto: CreateVehicleDto) {
    return this.vehicleRepository.save(createVehicleDto);
  }

  findAll() {
    return this.vehicleRepository.find();
  }

  async findOnePlate( plate: string){
    const response = await this.vehicleRepository.findOne({where:{plate}});
    if(response != null){
      return response
    }
    return {
      status:500,
      message:'Plate does not exist'
    }
  }

  async findOneId (id: number) {
    const response = await this.vehicleRepository.findOne({where:{id}});
    return response
  }

  async findOne (uuid: number, am:string ) {
    const response = await this.vehicleRepository.findOne({where:{uuid, am}});
    return response
  }

  async updateAntt(updateAntt: UpdateAntt) {
    const uuid = updateAntt.uuid
    // const res = await this.vehicleRepository.update(updateAntt.uuid, updateAntt);
    const res = await this.vehicleRepository
      .createQueryBuilder()
      .update(Vehicle)
      .set(updateAntt)
      .where('uuid = :uuid', { uuid }) // Critério de busca usando 'uuid'
      .execute();
    if(res.affected){
      return 200
    }else{
      return 500
    }
  }

  async updateClv(updateClv: UpdateClv) {
    const uuid = updateClv.uuid
    const res = await this.vehicleRepository
      .createQueryBuilder()
      .update(Vehicle)
      .set(updateClv)
      .where('uuid = :uuid', { uuid }) // Critério de busca usando 'uuid'
      .execute();
    if(res.affected){
      return 200
    }else{
      return 500
    }
  }

  async updateOwner(updateOwner: UpdateOwner) {
    const uuid = updateOwner.uuid
    const res = await this.vehicleRepository
      .createQueryBuilder()
      .update(Vehicle)
      .set(updateOwner)
      .where('uuid = :uuid', { uuid }) // Critério de busca usando 'uuid'
      .execute();
    if(res.affected){
      return 200
    }else{
      return 500
    }
  }

  async updateLegal(updateOwner: UpdateLegalOwner) {
    const uuid = updateOwner.uuid
    const res = await this.vehicleRepository
      .createQueryBuilder()
      .update(Vehicle)
      .set(updateOwner)
      .where('uuid = :uuid', { uuid }) // Critério de busca usando 'uuid'
      .execute();
    if(res.affected){
      return 200
    }else{
      return 500
    }
  }

  async updateCnpj(updateOwner: UpdateCnpjOwner) {
    const uuid = updateOwner.uuid
    const res = await this.vehicleRepository
      .createQueryBuilder()
      .update(Vehicle)
      .set(updateOwner)
      .where('uuid = :uuid', { uuid }) // Critério de busca usando 'uuid'
      .execute();
    if(res.affected){
      return 200
    }else{
      return 500
    }
  }

  async updateAddress(updateAddressDto: UpdateAddressDto) {
    const uuid = updateAddressDto.uuid
    const res = await this.vehicleRepository
      .createQueryBuilder()
      .update(Vehicle)
      .set(updateAddressDto)
      .where('uuid = :uuid', { uuid }) // Critério de busca usando 'uuid'
      .execute();
    if(res.affected){
      return 200
    }else{
      return 500
    }
  }

  async report(){
    let reportDate = []; 
    const vehicles = await this.findAll();
    for (const vehicle of vehicles) {
      if (vehicle.am !== 'driver') {
          continue;
      }
      let driver = await this.driverService.findOne(vehicle.uuid);
      if (driver == null) {
          continue;
      }
      const day    = driver.create_at.getUTCDate();
      const month  = driver.create_at.getUTCMonth() + 1; // getUTCMonth() retorna os meses de 0 a 11
      const year   = driver.create_at.getUTCFullYear();
      const date   = `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`;
      let owner    = {
          create: date,
          plate: vehicle.plate,
          type: vehicle.type,
          yearManufacture: vehicle.yearManufacture,
          brand: vehicle.brand,
          color: vehicle.color,
          driver: driver.name,
          cadaster: vehicle.cadastre,
          nameOwner: vehicle.nameOwner,
          cpfOwner: vehicle.cpfOwner,
          phoneOwner: vehicle.phoneOwner,
          cnpj: vehicle.cnpjOwner,
          stateRegistrationOwner: vehicle.stateRegistrationOwner,
          companyName: vehicle.companynameOwner
      };
      reportDate.push(owner);
    }
    return reportDate;
  }

  async reportDriver(){
    let reportDate = []; 
    const drivers = await this.driverService.findAll();
    for (const driver of drivers) {
      const vehicle = await this.findOne(driver.id, 'driver'); 
      if (vehicle == null) {
        continue;
      }
      const plug    = await this.plugService.findOne(driver.id, 'driver')
      const day     = driver.create_at.getUTCDate();
      const month   = driver.create_at.getUTCMonth() + 1; 
      const year    = driver.create_at.getUTCFullYear();
      const date    = `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`;
      let step;
      let stepUser;
      if(plug != 500){
        switch (plug.timeline) {
          case 1:
              step = 'EMAIL ENVIADO'
              stepUser = 'ANALISE'
              break;
          case 2:
              step = 'EM ANALISE'
              stepUser = 'ANALISE'
              break;
          case 3:
              if(plug.aproved === '1'){
                  step = 'APROVADO';
              }
              if(plug.aproved === '0'){
                  step = 'REPROVADO';
              }
              stepUser = 'ANALISE'
              break;
          case 4:
              stepUser = 'ANALISE'
              step = 'INTEGRADO'
              break;
          default:
              step = 'FICHA NÃO INICIADA'
              stepUser = 'CADASTRADO'
              break;
        }
      }
      let driverParams = {
          create: date,
          name:  driver.name,
          cpf:   driver.cpf,
          birth: driver.birth,
          plate: vehicle.brand,
          typeVehicle: vehicle.type === 'util' ? 'FIORINO' : vehicle.type,
          brand   : vehicle.brand,
          timeLine: stepUser,
          occurrence: step
      };
      reportDate.push(driverParams);
    }
    return reportDate;
  }

  remove(id: number) {
    return `This action removes a #${id} vehicle`;
  }
}
