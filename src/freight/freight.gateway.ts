import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer, OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { FreightService } from './freight.service';
import { CreateFreightDto } from './dto/create-freight.dto';
import { UpdateFreightDto } from './dto/update-freight.dto';
import { CreateRaceDto } from 'src/race/dto/create-race.dto';
import { Server } from 'socket.io';
import { CancelDriverFreightDto } from './dto/cancelDriverRace-freight.dto';
import { UserService } from 'src/user/user.service';
@WebSocketGateway()
export class FreightGateway {
  @WebSocketServer() server:Server;

  constructor(
    private readonly freightService: FreightService,
    private readonly userService   : UserService,
  ){}

  // afterInit() {
  //   this.server.on("connection", (socket) => {
  //     console.log(socket.id); 
  //     console.log(socket.rooms)
  //   });
  // }

  @SubscribeMessage('talk')
  handleEvent(@MessageBody() privateInfo : string ): void {
    this.server.to(privateInfo[0]).emit('message', privateInfo[1]);
  }

  @SubscribeMessage('findAllFreight')
  findAll() {
    return this.freightService.findAll();
  }

  @SubscribeMessage('findOneFreight')
  findOne(@MessageBody() id: number) {
    return this.freightService.findOne(id);
  }

  @SubscribeMessage('cancelRace')
  async cancelRace(@MessageBody() id: number) {
    this.server.emit('cancelRace'  , id); 
    this.server.emit('updateStatus', {id:id, isVisible: '0'});
    await this.freightService.update(id, {id: id, isVisible: '0'});
  }

  @SubscribeMessage('driverCancel')
  async driverCancel(@MessageBody()  data: CancelDriverFreightDto ){
    this.server.emit('driverCancel', data.idRace); 
    this.server.emit('cancelRace'  , data.idRace); 
    this.server.emit('updateStatus', {id:data.idRace, isVisible: '1'});
    await this.freightService.update(data.idRace, {id: data.idRace, isVisible: '1'});
    await this.userService.taxCancelRace(data.am, data.uuid);
  }

  @SubscribeMessage('updateStatus')
  async update(@MessageBody() updateFreightDto: UpdateFreightDto) {
    this.server.emit('updateStatus', {id:updateFreightDto.id, isVisible: '1'}); 
    setTimeout(async () => {
      await this.freightService.update(updateFreightDto.id, updateFreightDto);
    }, 3000);
  }

  @SubscribeMessage('createRace')
  async createRace(@MessageBody() CreateRaceDto: CreateRaceDto) {
     this.server.emit('NewRace', CreateRaceDto); 
  }

  @SubscribeMessage('removeFreight')
  remove(@MessageBody() id: number) {
    return this.freightService.remove(id);
  }

  
}


