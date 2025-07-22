import amqp from 'amqplib';
import { env } from '../config/env';
import { emitStatusUpdate } from '../ws/socket';

const statusMap = new Map<string, string>();

export function getStatusMap() {
  return statusMap;
}

export async function startConsumer() {
  const conn = await amqp.connect(env.amqpUrl!);
  const channel = await conn.createChannel();
  await channel.assertQueue(env.filaEntrada!);
  await channel.assertQueue(env.filaStatus!);

  channel.consume(env.filaEntrada!, async (msg) => {
    if (!msg) return;

    const { mensagemId } = JSON.parse(msg.content.toString());

    // Simula tempo de processamento (1-2 segundos)
    await new Promise((r) => setTimeout(r, 1000 + Math.random() * 1000));

    // Sucesso 80% ou falha 20%
    const sucesso = Math.random() > 0.2;
    const status = sucesso ? 'PROCESSADO_SUCESSO' : 'FALHA_PROCESSAMENTO';

    // Salva em memória
    statusMap.set(mensagemId, status);

    // Emite para todos os clientes conectados via WebSocket
    emitStatusUpdate(mensagemId, status);

    // Publica em fila de status
    const payload = JSON.stringify({ mensagemId, status });
    channel.sendToQueue(env.filaStatus!, Buffer.from(payload));

    channel.ack(msg);
  });
}
