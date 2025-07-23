# 📨 Sistema de Notificações Assíncronas

Este projeto é um backend desenvolvido com **Node.js + Express** que simula o envio de notificações de forma assíncrona utilizando **RabbitMQ**. As mensagens são processadas com atraso simulado e o status pode ser consultado via API.

---

## 🚀 Tecnologias Utilizadas

- Node.js + Express
- TypeScript
- RabbitMQ (com amqplib)
- Swagger (swagger-jsdoc + swagger-ui-express)
- UUID
- dotenv

---

## 📦 Instalação

```bash
git clone https://github.com/seu-usuario/seu-repositorio.git
cd backend
npm install
```

---

## ⚙️ Configuração do ambiente

Crie um arquivo `.env` com base no `.env.example`:

```env
PORT=3000
AMQP_URL=amqp://<user>:<senha>@<host>/<vhost>
FILA_ENTRADA=fila.notificacao.entrada.Stevan
FILA_STATUS=fila.notificacao.status.Stevan
```

> ⚠️ Importante: a variável `AMQP_URL` **deve conter o vhost no final**.

---

## ▶️ Execução do servidor

```bash
npm run dev
```

O servidor estará disponível em:  
[http://localhost:3000](http://localhost:3000)

---

## 📚 Documentação Swagger

A documentação da API pode ser acessada em:

[http://localhost:3000/api/docs](http://localhost:3000/api/docs)

---

## 🔁 Fluxo da aplicação

1. **POST /api/notificar**  
   Envia uma nova notificação com `contentMessage`.  
   O backend publica na fila e responde imediatamente com status "AGUARDANDO_PROCESSAMENTO".

2. **(internamente)**  
   Um consumer escuta a fila, simula um atraso (1–2s), e define aleatoriamente se o processamento foi um sucesso ou falha.

3. **GET /api/notificar/status/:id**  
   Consulta o status da mensagem por ID (armazenado em memória via `Map`).

---

## 🧪 Teste rápido com cURL

```bash
curl -X POST http://localhost:3000/api/notificar \
  -H "Content-Type: application/json" \
  -d '{"contentMessage": "Olá do Swagger!"}'
```

---

## ✅ Status da implementação

- [x] Envio e rastreamento de mensagens via RabbitMQ
- [x] Producer e consumer com simulação de falha
- [x] Armazenamento de status em memória
- [x] Swagger documentando todas as rotas
- [x] Middleware de CORS habilitado

---

## 🧑‍💻 Autor

Stevan Padilha
