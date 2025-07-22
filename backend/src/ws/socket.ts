import { Server as HttpServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';

let io: SocketIOServer;

export function setupWebSocket(server: HttpServer) {
  io = new SocketIOServer(server, {
    cors: { origin: '*' },
  });

  io.on('connection', (socket) => {
    console.log(`[WS] Cliente conectado: ${socket.id}`);
  });

  console.log('[WS] Servidor WebSocket iniciado');
}

export function emitStatusUpdate(mensagemId: string, status: string) {
  if (!io) return;
  io.emit('statusUpdate', { mensagemId, status });
}
