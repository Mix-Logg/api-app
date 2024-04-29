import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards,  } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { CreateDonateDto } from './dto/create-donate-dto';
import { CreateCalculateDto } from './dto/create-calculate.dto';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { ThrottlerBehindProxyGuard } from 'util/findIP.guard';
import { CreateTransferDto } from './dto/create-transfer.dto';
@Controller('payment')
export class PaymentController {
  

  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  async createWallet(@Body() createWalletDto: CreateWalletDto) {
    return this.paymentService.createWallet(createWalletDto);
  }

  @Post('person')
  async createPerson(@Body() createPersonDto: CreatePersonDto) {
    return this.paymentService.createPerson(createPersonDto);
  }
  
  @Post('transferer')
  async transferer(@Body() createTransferDto: CreateTransferDto) {
    return this.paymentService.transferer(createTransferDto);
  }

  @Post('donate')
  async donate(@Body() createDonateDto: CreateDonateDto){
    return this.paymentService.createDonate(createDonateDto);
  }

  @Post('calculate')
  async calculate(@Body() createCalculateDto: CreateCalculateDto){
    return this.paymentService.calculate(createCalculateDto);
  }

  @Get()
  findAll() {
    return this.paymentService.findAll();
  }

  @Get('wallet/:id')
  findOne(@Param('id') id: string) {
    return this.paymentService.findOneWallet(id);
  }

  @Get('balance/:id')
  findBalance(@Param('id') id: string) {
    return this.paymentService.findBalance(id);
  }

  @Get('login/:id')
  linkLoginWallet(@Param('id') id: string) {
    return this.paymentService.linkLoginWallet(id);
  }


  @Patch('wallet/:id')
  @UseGuards(ThrottlerBehindProxyGuard)
  updateWallet(@Param('id') id: string, @Body() updateWalletDto: UpdateWalletDto) {
    return this.paymentService.updateWallet(id, updateWalletDto);
  }

  @Patch('person/:idWallet/:idPerson')
  updatePerson(
    @Param('idWallet') idWallet: string, 
    @Param('idPerson') idPerson: string, 
    @Body() updatePersonDto: UpdatePersonDto) {
    return this.paymentService.updatePerson( idWallet, idPerson, updatePersonDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paymentService.remove(+id);
  }
}
