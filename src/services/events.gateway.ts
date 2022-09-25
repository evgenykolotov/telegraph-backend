import {
  MessageBody,
  WebSocketServer,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway()
export class EventsGateway {
  @WebSocketServer()
  public server: Server;

  @SubscribeMessage('send_message')
  public handleEvent(@MessageBody() data: string): string {
    return data;
  }
}
