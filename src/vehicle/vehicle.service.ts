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
@Injectable()
export class VehicleService {
  constructor(
    @Inject('VEHICLE_REPOSITORY') 
    private vehicleRepository: Repository<Vehicle>,
    private readonly driverService : DriverService
  ){}
  
  create(createVehicleDto: CreateVehicleDto) {
    return this.vehicleRepository.save(createVehicleDto);
  }

  findAll() {
    return this.vehicleRepository.find();
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
        
        let owner = {
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

  remove(id: number) {
    return `This action removes a #${id} vehicle`;
  }
}
