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
     console.log(res)
  }

  findAll() {
    return `This action returns all avalidPhoto`;
  }

  async findOne(uuid: number, am:string) {
    return this.avalidPhotoRepository.find({ where: { uuid, am } }); 
  }

  async update( updateAvalidPhotoDto: CreateAvalidPhotoDto) {
    const uuid = updateAvalidPhotoDto.uuid
    const am = updateAvalidPhotoDto.am
    const res = await this.avalidPhotoRepository
      .createQueryBuilder()
      .update(AvalidPhoto)
      .set(updateAvalidPhotoDto)
      .where('uuid = :uuid', { uuid }) // Critério de busca usando 'uuid'
      .andWhere('am = :am', { am })
      .execute();
    if(res.affected){
      return 200
    }else{
      return 500
    }
  }

  remove(id: number) {
    return `This action removes a #${id} avalidPhoto`;
  }
}
