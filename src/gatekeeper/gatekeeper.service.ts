import { OnModuleInit, Injectable, Logger } from '@nestjs/common';
import { Client, ClientGrpc } from '@nestjs/microservices';
import { grpcClientOptions } from 'src/grpc.client.options';
import { BoardUpdate, GatekeeperService } from './gatekeeper.interfaces';

@Injectable()
export class GatekeeperClientService implements OnModuleInit {
  @Client(grpcClientOptions)
  private readonly client: ClientGrpc;

  private gatekeeperService: GatekeeperService;

  onModuleInit() {
    this.gatekeeperService = this.client.getService<GatekeeperService>(
      'GatekeeperService',
    );
    console.log('GatekeeerService', this.client);
  }

  updateBoard(updates: BoardUpdate[]): boolean {
    return this.gatekeeperService.updateBoard({ updates }).requestStatus;
  }
}
