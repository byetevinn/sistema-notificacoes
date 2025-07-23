import { SocketIoConfig } from 'ngx-socket-io';

export const socketConfig: SocketIoConfig = {
  url: 'http://localhost:3000',
  options: {
    transports: ['websocket'],
  },
};
