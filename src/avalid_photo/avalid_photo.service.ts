import { Inject, Injectable } from '@nestjs/common';
import { CreateAvalidPhotoDto } from './dto/create-avalid_photo.dto';
import { UpdateAvalidPhotoDto } from './dto/update-avalid_photo.dto';
import { AvalidPhoto } from './entities/avalid_photo.entity';
import { Repository } from 'typeorm';
import { DriverService } from 'src/driver/driver.service';
import { AuxiliaryService } from 'src/auxiliary/auxiliary.service';
@Injectable()
export class AvalidPhotoService {

  constructor(
    @Inject('AVALIDPHOTO_REPOSITORY') 
    private avalidPhotoRepository: Repository<AvalidPhoto>,
    private driverRepository  : DriverService,
    private auxiliaryRepository     : AuxiliaryService
  ){}

  async create(createAvalidPhotoDto: CreateAvalidPhotoDto) {
     const res = await this.avalidPhotoRepository.save(createAvalidPhotoDto);
     return res
  }

  findAll() {
    return this.avalidPhotoRepository.find();
  }

  async findOne(uuid: number, am:string) {
    return this.avalidPhotoRepository.find({ where: { uuid, am } }); 
  }

  async findRejected(){
    const rejected = await this.avalidPhotoRepository.find({ where: { 
      valid:'0',
    }
    }); 

    let driverData = rejected
    .filter(item => item.am === "driver")
    .map(item => ({ id: item.uuid, }));

    let auxiliaryData = rejected
    .filter(item => item.am === "auxiliary")
    .map(item => ({ id: item.uuid, }));
    
    const driverIds = [...new Set(driverData.map(objeto => objeto.id))];
    const auxiliaryIds = [...new Set(auxiliaryData.map(objeto => objeto.id))];
    return {
      driver:driverIds,
      auxiliary:auxiliaryIds
    }
  }

  async findNoAvalid(){
    const auxiliary  = await this.auxiliaryRepository.findNews()
    const drivers    = await this.driverRepository.findNews()
    const photos     = await this.findAll()
    const photosDriversUuids = new Set(photos.filter(item => item.am === 'driver').map(item => item.uuid));
    const photosAuxiliariesUuids = new Set(photos.filter(item => item.am === 'auxiliary').map(item => item.uuid));
    
    const naoEstaNaPhotosDriver = drivers.filter(driver => !photosDriversUuids.has(driver.id));
    console.log(naoEstaNaPhotosDriver)
    const naoEstaNaPhotosAuxiliary = auxiliary.filter(auxiliary => !photosAuxiliariesUuids.has(auxiliary.id));
  
    return {
      driver   :naoEstaNaPhotosDriver,
      auxiliary:naoEstaNaPhotosAuxiliary
    };
  }

  async update( updateAvalidPhotoDto: UpdateAvalidPhotoDto) {
    const id = updateAvalidPhotoDto.id
    const res = await this.avalidPhotoRepository
      .createQueryBuilder()
      .update(AvalidPhoto)
      .set(updateAvalidPhotoDto)
      .where('id = :id', { id }) // Critério de busca usando 'uuid'
      .execute();
    if(res.affected){
      return 200
    }else{
      return 500
    }
  }

  async remove(uuid: number, am:string, photo: string) {
    const avalidPhoto = await this.avalidPhotoRepository.findOne({ where: { uuid, am, photo } });
    if (!avalidPhoto) {
      return 500
    }
    const remove = await this.avalidPhotoRepository.remove(avalidPhoto);
    return 200
  }


}
