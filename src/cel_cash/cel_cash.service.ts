import { Injectable } from '@nestjs/common';
import { CreateCelCashDto } from './dto/create-cel_cash.dto';
import { UpdateCelCashDto } from './dto/update-cel_cash.dto';
import { DriverService } from 'src/driver/driver.service';
import { AuxiliaryService } from 'src/auxiliary/auxiliary.service';
import { UserService } from 'src/user/user.service';
import { CreateAdvanceCashDto } from './dto/advance-cel_cash.dto';
import axios from 'axios';

@Injectable()
export class CelCashService {
  private readonly galaxId = process.env.GALAX_ID;
  private readonly galaxHash = process.env.GALAX_HASH;
  private accessToken: string;
  private tokenExpiry: number;
  constructor(
    private readonly driverService : DriverService,
    private readonly auxiliaryService: AuxiliaryService,
    private readonly userService: UserService
  ) {
    this.getToken();
  }

  private async getToken() {
    const authString = `${this.galaxId}:${this.galaxHash}`;
    const base64AuthString =  Buffer.from(authString).toString('base64');
    const body = {
      grant_type: 'authorization_code',
      scope: 'customers.read customers.write plans.read plans.write transactions.read transactions.write webhooks.write balance.read balance.write cards.read cards.write card-brands.read subscriptions.read subscriptions.write charges.read charges.write boletos.read'
    };
    try {
      const response = await axios.post('https://api.sandbox.cel.cash/v2/token', body, {
        headers: {
          'Authorization': `Basic ${base64AuthString}`,
        },
      });

      this.accessToken = response.data.access_token;
      this.tokenExpiry = Date.now() + (response.data.expires_in * 1000);
      // console.log(`Access Token: ${this.accessToken}`);

      // Renove o token 60 segundos antes de expirar
      setTimeout(() => this.getToken(), (response.data.expires_in - 60) * 1000);
    } catch (error) {
      console.log(base64AuthString)
      console.log('Error obtaining access token:', error.response.data);
    }
  }

  async advance(createAdvanceCashDto:CreateAdvanceCashDto){
    const user = await this.userService.findOne(createAdvanceCashDto.uuid, createAdvanceCashDto.am);
    switch (user) {
      case 500:
        return
      default:
        if(createAdvanceCashDto.amount > parseInt(user.amount)){
          return 'Não pode tirar o dinheiro'
        }
        return 'Pode tirar o dinheiro'
        break;
    }
    const amountAvailable = user
    console.log(user)
    // if(amount > user.amount){

    // }
  }

  token(){
    return {
      token:  this.accessToken,
      status: 200
    }
  }

  create(createCelCashDto: CreateCelCashDto) {
    return 'This action adds a new celCash';
  }

  findAll() {
    return `This action returns all celCash`;
  }

  findOne(id: number) {
    return `This action returns a #${id} celCash`;
  }

  update(id: number, updateCelCashDto: UpdateCelCashDto) {
    return `This action updates a #${id} celCash`;
  }

  remove(id: number) {
    return `This action removes a #${id} celCash`;
  }
}


