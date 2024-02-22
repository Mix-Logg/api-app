import { Inject, Injectable } from '@nestjs/common';
import { CreateAvalidPhotoDto } from './dto/create-avalid_photo.dto';
import { UpdateAvalidPhotoDto } from './dto/update-avalid_photo.dto';
import { AvalidPhoto } from './entities/avalid_photo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AvalidPhotoService {

  constructor(
    @Inject('AVALIDPHOTO_REPOSITORY') 
    private avalidPhotoRepository: Repository<AvalidPhoto>,
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
