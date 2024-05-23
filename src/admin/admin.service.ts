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
    // private raceService: RaceService
  ){}

  create(createAdminDto: CreateAdminDto) {
    // const hashedPassword = await bcrypt.hashSync(`${password}`, 10);
    return 'This action adds a new admin';
  }

  async sendEmail(sendEmailDTO: SendEmail){
    let res = await this.emailService.sendEmail(sendEmailDTO)
    return res
  }

  findAll() {
    return `This action returns all admin`;
  }

  async findOne(id: number) {
    const admin = await this.adminRepository.findOne({where:{id}});
    if(admin != null){
      return admin
    }
    return {
      status:500,
      message:'Admin does not exist'
    }
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
