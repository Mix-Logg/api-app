import { Inject, Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Admin } from './entities/admin.entity'
import { Repository } from 'typeorm';
import { EmailService } from 'src/email/email.service';
import { SendEmail } from './dto/sendEmail-admin.dto';


@Injectable()
export class AdminService {
  constructor(
    @Inject('ADMIN_REPOSITORY') 
    private adminRepository: Repository<Admin>,
    private readonly emailService: EmailService
    // private addressService: AddressService
  ){}

  create(createAdminDto: CreateAdminDto) {
    return 'This action adds a new admin';
  }

  async sendEmail(sendEmailDTO: SendEmail){
    let res = await this.emailService.sendEmail(sendEmailDTO.to,sendEmailDTO.subject,sendEmailDTO.text, sendEmailDTO.oneFile, sendEmailDTO?.content ,sendEmailDTO?.contentBlob)
    return res
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
