import { Injectable } from '@nestjs/common';
import { CreateCelCashDto } from './dto/create-cel_cash.dto';
import { UpdateCelCashDto } from './dto/update-cel_cash.dto';
import { DriverService } from 'src/driver/driver.service';
import { AuxiliaryService } from 'src/auxiliary/auxiliary.service';
import { UserService } from 'src/user/user.service';
import { CreateAdvanceCashDto } from './dto/advance-cel_cash.dto';
import { CreatePaymentDto } from './dto/create-payment.dto';
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
    setTimeout(() => {
      this.listenPayment()
    }, 3000);
  }

  private async getToken() {
    const authString = `${this.galaxId}:${this.galaxHash}`;
    const base64AuthString =  Buffer.from(authString).toString('base64');
    const body = {
      grant_type: 'authorization_code',
      scope: 'customers.read customers.write plans.read plans.write transactions.read transactions.write webhooks.write balance.read balance.write cards.read cards.write card-brands.read subscriptions.read subscriptions.write charges.read charges.write boletos.read'
    };
    try {
      const response = await axios.post(`${process.env.GALAX_URL}/token`, body, {
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

  private async listenPayment(){
    const params_webhook = {
    "url": `https://seashell-app-inyzf.ondigitalocean.app/cel-cash/webhook-galax-pay`,
      "events": [
        "transaction.updateStatus",
        "company.cashOut"
      ]
    }
    try{
      const response = await axios.put(`${process.env.GALAX_URL}`, params_webhook, {
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
        },
      })

      console.log(response)
    }catch(error){
      console.log('erro Weebhook',error.response.data)
    }
  }

  async advance(createAdvanceCashDto:CreateAdvanceCashDto){
    const user = await this.userService.findOne(createAdvanceCashDto.uuid, createAdvanceCashDto.am);
    switch (user) {
      case 500:
        return
      default:
        if(createAdvanceCashDto.value > parseInt(user.amount)){
          return 'Não pode tirar o dinheiro'
        }
        break;
    }
    try{
      const pix_params = {
        "key": createAdvanceCashDto.key,
        "type": createAdvanceCashDto.type,
        "value": createAdvanceCashDto.value,
        "desc": createAdvanceCashDto.desc
      }
      const response = await axios.post(`${process.env.GALAX_URL}/pix/payment`, pix_params, {
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
        },
      })
      console.log(response.data)
    }catch(error){
      console.log('erro',error.response.data)
    }
  }

  async listen(){
    
  }

  async createPayment(createPaymentDto:CreatePaymentDto ){
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const currence = `${year}-${month}-${day}`;
    let payment_params = {
      myId : createPaymentDto.myId,
      value: createPaymentDto.value,
      additionalInfo: createPaymentDto.additionalInfo,
      payday:currence,
      Customer:{
        name:     createPaymentDto.name,
        document: createPaymentDto.cpf,
        emails:   [createPaymentDto.email],
        phones:   [createPaymentDto.phone]
      },
      mainPaymentMethodId:createPaymentDto.type,
      PaymentMethodPix:{},
      PaymentMethodCreditCard:{}
    }
    switch (await createPaymentDto.type) {
      case 'pix':
        payment_params.mainPaymentMethodId = 'pix'
        payment_params.PaymentMethodPix = {
          instructions : 'Pagamento Mix Serviços Logísticos',
          Deadline:{
            type: 'minutes',
            value: 15
          }
        }
        break;
      case 'creditcard':
        payment_params.mainPaymentMethodId = 'creditcard'
        payment_params.PaymentMethodCreditCard = {
          Card:{
            number:    createPaymentDto.numberCard,
            holder:    createPaymentDto.nameCard,
            expiresAt: createPaymentDto.expiresAtCard,
            cvv:       createPaymentDto.cvvCard
          },
          qtdInstallments:1
        }
        break;
      default:
        return{
          status:500,
          message:'Type payment not defined'
        }
    }
    try{
      const response = await axios.post(`${process.env.GALAX_URL}/charges`, payment_params, {
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
        },
      })
      if(createPaymentDto.type == 'pix'){
        return response.data.Charge.Transactions[0].Pix
      }
      return response.data;
    }catch(error){
      console.log('erro',error.response.data.error.details)
      return{
        status:500,
        message:'Error cel_cash'
      }
    }
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


