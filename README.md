# Sistema de Notificações Assíncronas

Este projeto é um sistema full-stack de envio e processamento de notificações de forma assíncrona, utilizando Angular no frontend e Node.js com RabbitMQ no backend.

---

## 📊 Visão Geral

* O usuário envia uma notificação pelo frontend (Angular)
* O backend (Node.js + Express) recebe, publica na fila RabbitMQ
* Um consumidor processa essa mensagem de forma assíncrona
* O backend emite o status via WebSocket (socket.io)
* O frontend atualiza o status da mensagem em tempo real

---

## 📁 Estrutura do Projeto

```
SISTEMA-NOTIFICACOES/
├── backend/     # Backend em Node.js + Express + RabbitMQ
├── frontend/    # Frontend em Angular com tema escuro
└── README.md   # Este arquivo
```

---

## 🚀 Como executar o projeto

### Backend

```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

### Frontend

```bash
cd frontend
npm install
ng serve
```

Acesse em [http://localhost:4200](http://localhost:4200)

---

## 🔗 Tecnologias principais

### Backend:

* Node.js
* Express.js
* amqplib (RabbitMQ)
* socket.io
* dotenv

### Frontend:

* Angular 17+ (standalone)
* HttpClient
* ngx-socket-io
* SCSS (tema escuro)

---

## ✨ Funcionalidades

* Envio de mensagens via interface web
* Processamento assíncrono simulado com delay
* Status dinâmico: aguardando, sucesso ou falha
* Atualização em tempo real via WebSocket
* Estilização escura com destaque visual por status

---

## 📖 Leia mais

* [README do Backend](./backend/README.md)
* [README do Frontend](./frontend/README.md)

---

## 🧑‍💻 Autor

Stevan Padilha