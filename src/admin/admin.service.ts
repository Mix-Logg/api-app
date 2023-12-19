import { Inject, Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Admin } from './entities/admin.entity'
import { Repository } from 'typeorm';

@Injectable()
export class AdminService {
  constructor(
    @Inject('ADMIN_REPOSITORY') 
    private adminRepository: Repository<Admin>,
    // private addressService: AddressService
  ){}

  create(createAdminDto: CreateAdminDto) {
    return 'This action adds a new admin';
  }

  findAll() {
    return `This action returns all admin`;
  }

  findOne(id: number) {
    return `This action returns a #${id} admin`;
  }

  findUser(user: string) {
    return this.adminRepository.findOne({where:{user}});
  }

  update(id: number, updateAdminDto: UpdateAdminDto) {
    return `This action updates a #${id} admin`;
  }

  remove(id: number) {
    return `This action removes a #${id} admin`;
  }

}
