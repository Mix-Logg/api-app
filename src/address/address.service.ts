import { Inject, Injectable } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { Repository } from 'typeorm';
import { Address } from './entities/address.entity';

@Injectable()
export class AddressService {
  constructor(
    @Inject('ADDRESS_REPOSITORY') 
    private addressRepository: Repository<Address>,
  ){}
  create(createAddressDto: CreateAddressDto) {
    const response = this.addressRepository.save(createAddressDto);
    if(response){
      return {
        status:201,
        result:'Successfully created address'
      }
    }
    return {
      status :500,
      result :'Server internal error'
    }
  }

  findAll() {
    return this.addressRepository.find();
  }

  findOne(uuid: number, am: string) {
    return this.addressRepository.findOne({where:{uuid,am}});
  }

  async update(updateAddressDto: UpdateAddressDto) {
    const uuid = updateAddressDto.uuid
    const am = updateAddressDto.am
    const res = await this.addressRepository
      .createQueryBuilder()
      .update(Address)
      .set(updateAddressDto)
      .where('uuid = :uuid', { uuid }) // Critério de busca usando 'uuid'
      .andWhere('am = :am', { am }) // Critério de busca usando 'am'
      .execute();
    if(res.affected){
      return 200
    }else{
      return 500
    }

  }

  remove(id: number) {
    return `This action removes a #${id} address`;
  }
}
