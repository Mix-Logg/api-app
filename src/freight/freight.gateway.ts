import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer, OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { FreightService } from './freight.service';
import { CreateFreightDto } from './dto/create-freight.dto';
import { UpdateFreightDto } from './dto/update-freight.dto';
import { CreateRaceDto } from 'src/race/dto/create-race.dto';
import { Server } from 'socket.io';

@WebSocketGateway()
export class FreightGateway {
  @WebSocketServer() server:Server;

  constructor(
    private readonly freightService: FreightService,
  ){}

  // afterInit() {
  //   this.server.on("connection", (socket) => {
  //     console.log(socket.id); 
  //     console.log(socket.rooms)
  //   });
  // }

  @SubscribeMessage('talk')
  handleEvent(@MessageBody() id : string,  message: any ): void {
    this.server.to(id).emit('message', message);
  }

  @SubscribeMessage('findAllFreight')
  findAll() {
    return this.freightService.findAll();
  }

  @SubscribeMessage('findOneFreight')
  findOne(@MessageBody() id: number) {
    return this.freightService.findOne(id);
  }

  @SubscribeMessage('updateStatus')
  async update(@MessageBody() updateFreightDto: UpdateFreightDto) {
    this.server.emit('updateStatus', updateFreightDto.id); 
    const response = await this.freightService.update(updateFreightDto.id, updateFreightDto);
  }

  @SubscribeMessage('createRace')
  async createRace(@MessageBody() CreateRaceDto: CreateRaceDto) {
    const newRace = await this.freightService.create(CreateRaceDto);
    console.log(newRace)
    this.server.emit('NewRace', newRace); 
  }

  @SubscribeMessage('removeFreight')
  remove(@MessageBody() id: number) {
    return this.freightService.remove(id);
  }

  
}


