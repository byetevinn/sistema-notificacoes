import dotenv from 'dotenv';

dotenv.config();

function required(name: string, value: string | undefined): string {
  if (!value) {
    throw new Error(`Variável de ambiente obrigatória não definida: ${name}`);
  }
  return value;
}

export const env = {
  port: process.env.PORT || '3000',
  amqpUrl: required('AMQP_URL', process.env.AMQP_URL),
  filaEntrada: required('FILA_ENTRADA', process.env.FILA_ENTRADA),
  filaStatus: required('FILA_STATUS', process.env.FILA_STATUS),
};
