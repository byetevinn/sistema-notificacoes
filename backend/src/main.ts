import app from './app';
import { createServer } from 'http';
import { setupWebSocket } from './ws/socket';
import { startConsumer } from './queue/consumer';
import dotenv from 'dotenv';

dotenv.config();

const server = createServer(app);
setupWebSocket(server);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  startConsumer();
});
