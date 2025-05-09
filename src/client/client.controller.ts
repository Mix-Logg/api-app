import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Sign } from './dto/sign-client.dto';
import { sendCodeEmail } from './dto/sendCodeEmail-client.dto';
@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post()
  create(@Body() createClientDto: CreateClientDto) {
    return this.clientService.create(createClientDto);
  }

  @Post('sign')
  sign(@Body() sign: Sign) {
    return this.clientService.sign(sign);
  }
  @Post('sendCode')
  async sendCode(@Body() sendEmailDTO: sendCodeEmail) {
    return this.clientService.sendCode(sendEmailDTO);
  }
  
  @Get()
  findAll() {
    return this.clientService.findAll();
  }

  @Get(':email')
  findOne(@Param('email') email: string) {
    return this.clientService.findOne(email);
  }

  @Get('id/:id')
  findOneById(@Param('id') id: number) {
    return this.clientService.findOneById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClientDto: UpdateClientDto) {
    return this.clientService.update(+id, updateClientDto);
  }

  @Patch('simple/:id')
  updateSimple(@Param('id') id: string, @Body() updateClientDto: UpdateClientDto) {
    return this.clientService.updateSimple(+id, updateClientDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clientService.remove(+id);
  }
}
