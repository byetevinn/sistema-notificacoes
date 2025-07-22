import app from './app';
import { env } from './config/env';
import { startConsumer } from './queue/consumer';

const PORT = env.port;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  startConsumer();
});
