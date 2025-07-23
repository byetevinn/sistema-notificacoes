import amqp from 'amqplib';
import { env } from '../config/env';

const MAPA_FILA = env.filaEntrada;

export async function publishToQueue(
  messageId: string,
  contentMessage: string
) {
  const conn = await amqp.connect(env.amqpUrl!);
  const channel = await conn.createChannel();
  await channel.assertQueue(MAPA_FILA);

  const payload = JSON.stringify({ messageId, contentMessage });
  channel.sendToQueue(MAPA_FILA, Buffer.from(payload));
}
