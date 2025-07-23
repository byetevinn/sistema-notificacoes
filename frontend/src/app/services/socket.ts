import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SocketService {
  constructor(private socket: Socket) {}

  listenStatus(): Observable<{ messageId: string; status: string }> {
    return this.socket.fromEvent('statusUpdate');
  }
}
