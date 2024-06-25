import { Injectable } from '@nestjs/common';
import { CreateCelCashDto } from './dto/create-cel_cash.dto';
import { UpdateCelCashDto } from './dto/update-cel_cash.dto';
import { DriverService } from 'src/driver/driver.service';
import { AuxiliaryService } from 'src/auxiliary/auxiliary.service';
import { UserService } from 'src/user/user.service';
import { CreateAdvanceCashDto } from './dto/advance-cel_cash.dto';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { CreateRetrieveRacePixDto } from './dto/create-retrieveRacePix.dto';
import { PaymentRaceService } from 'src/payment_race/payment_race.service';
import { PaymentRaceRetrieveService } from 'src/payment_race-retrieve/payment_race-retrieve.service';
import { CreateWalletDto } from './dto/createWallet-cel_cash.dto';
import { AddressService } from 'src/address/address.service';
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
    private readonly userService: UserService,
    private readonly paymentRaceService: PaymentRaceService,
    private readonly paymentRaceRetrieveService: PaymentRaceRetrieveService,
    private readonly addressService: AddressService,
  ) {
    this.getTokenGlobal();
    // setTimeout(() => {
    //   this.registerPayment()
    // }, 3000);
  }

  private async getTokenGlobal() {
    const authString = `${this.galaxId}:${this.galaxHash}`;
    const base64AuthString =  Buffer.from(authString).toString('base64');
    const body = {
      grant_type: 'authorization_code',
      scope: 'customers.read customers.write plans.read plans.write transactions.read transactions.write webhooks.write balance.read balance.write cards.read cards.write card-brands.read subscriptions.read subscriptions.write charges.read charges.write boletos.read company.write'
    };
    try {
      const response = await axios.post(`${process.env.GALAX_URL}/token`, body, {
        headers: {
          'Authorization': `Basic ${base64AuthString}`,
        },
      });

      this.accessToken = response.data.access_token;
      this.tokenExpiry = Date.now() + (response.data.expires_in * 1000);
      console.log(`Access Token: ${this.accessToken}`);

      // Renove o token 60 segundos antes de expirar
      setTimeout(() => this.getToken(), (response.data.expires_in - 60) * 1000);
    } catch (error) {
      console.log(base64AuthString)
      console.log('Error obtaining access token:', error.response);
    }
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

      return response.data.access_token;
    } catch (error) {
      console.log(base64AuthString)
      console.log('Error obtaining access token:', error.response);
    }
  }

  private async registerPayment(){
    const params_webhook = {
      "url": "https://seashell-app-inyzf.ondigitalocean.app/cel-cash/webhook-galax-pay",
      "events": [
        "transaction.updateStatus",
        "company.cashOut"
      ]
    }
    try{
      const response = await axios.put(`${process.env.GALAX_URL}/webhooks`,params_webhook, {
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
        },
      })
      console.log(response.data)
    }catch(error){
      console.log('erro Weebhook',error.response.data)
    }
  }

  async createWallet(createWalletDto: CreateWalletDto){
    let delivery;
    switch (createWalletDto.am) {
      case 'auxiliary':
        delivery = await this.auxiliaryService.findOne(createWalletDto.idDelivery)
        break;
      case 'driver':
        delivery = await this.driverService.findOne(createWalletDto.idDelivery)
        break;
    }
    const user    = await this.userService.findOne(createWalletDto.idDelivery, createWalletDto.am);
    const address = await this.addressService.findOne(createWalletDto.idDelivery, createWalletDto.am)
    const datesWallet = {
      name    :delivery.name,
      document:delivery.cpf,
      phone   :delivery.phone,
      emailContact:delivery.email,
      canAccessPlatform: false,
      softDescriptor:`Mix Serviços Logísticos`,
      logo:`base_64`,
      Professional:{
        internalName:`others`,
        inscription : createWalletDto.am == 'driver' ? delivery.cnh : delivery.rg
      },
      Address:{
        zipCode:address.zipCode,
        street :address.street,
        number :address.number,
        neighborhood:address.district,
        complement:address.complement,
        city :address.city,
        state:address.uf 
      }
    }
    try{
      const response = await axios.post(`${process.env.GALAX_URL}/company/subaccount`, datesWallet, {
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
        },
      });
      console.log(response)
    }catch(e){
      console.log(e.response.data)
    }
    return
    
    // const response = await axios.post(`${process.env.GALAX_URL}/company/subaccount`)
    // console.log(response)
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
        "key"  : createAdvanceCashDto.key,
        "type" : createAdvanceCashDto.type,
        "value": createAdvanceCashDto.value,
        "desc" : createAdvanceCashDto.desc
      }
      const response = await axios.post(`${process.env.GALAX_URL}/pix/payment`, pix_params, {
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
        }
      })
      console.log(response.data)
    }catch(error){
      console.log('erro',error.response.data)
    }
  }

  async retrieveRace(createRetrieveRacePixDto:CreateRetrieveRacePixDto){
    try{
      const pix_params = {
        "key"  : createRetrieveRacePixDto.key,
        "type" : createRetrieveRacePixDto.type,
        "value": createRetrieveRacePixDto.value,
        "desc" : createRetrieveRacePixDto.desc
      }
      const response = await axios.post(`${process.env.GALAX_URL}/pix/payment`, pix_params, {
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
        },
      })
      console.log(response)
      return response.data
    }catch(e){
      console.log(e)
    }
  }

  async webhook( payload: any){
    if(payload.event == 'transaction.updateStatus' ){
      switch (payload.Charge.mainPaymentMethodId) {
        case 'pix':
          if(payload.Transaction.status == 'payedPix'){
            const params_payment = {
              status:"paid"
            }
            const response = await this.paymentRaceService.update(payload.Charge.myId, params_payment)
            if(response.status == 200){
              return true
            }
            return{
              status: 500,
              message:'Payment internal incomplet'
            }
          }else{
            console.log(payload.Transaction.status)
          }
        break;
      }
    }
    // if(payload.event == 'company.cashOut' ){
    //   const webhookId = payload.webhookId;
    //   const idPayment = payload.Cashout.Pix.description.split(':');
    //   console.log(idPayment)
    //   const option = idPayment[1].split('-');
    //   switch (option[0]) {
    //     case 'raceRetrieve':
    //       if(payload.Cashout.Pix.status == 'efectivated'){
    //         const response = await this.paymentRaceRetrieveService.update(idPayment[1],{webhookId:webhookId.toString()})
    //         if(response.status == 200){
    //           return 'ação'
    //         }
    //         console.log(response)
    //       }
    //       break;
      
    //     case '':

    //       break;
    //   }
    // }
  }

  async createPayment(createPaymentDto:CreatePaymentDto ){
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const currence = `${year}-${month}-${day}`;
    const race_params = {
      type     :createPaymentDto.type,
      id_client:createPaymentDto.idUser,
      amount   :createPaymentDto.value,
      status   :'open'
    }
    const racePayment = await this.paymentRaceService.create(race_params)
    let payment_params = {
      myId : racePayment.id,
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
        return {
          payment:response.data.Charge.Transactions[0].Pix,
          idPayment:racePayment.id
        }
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

  // async toReverse(createToReverseDto:CreateToReverseDto){
  //   const response = await axios.put(`${process.env.GALAX_URL}/charges/${createToReverseDto.chargeId}/${createToReverseDto.typeId}/reverse`)
  //   console.log(response)
  // }

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


