# Frontend - Sistema de Notificações Assíncronas

Este frontend foi desenvolvido em Angular, com comunicação HTTP para envio de mensagens e WebSocket para recebimento de atualizações em tempo real sobre o status.

---

## ⚙️ Tecnologias Utilizadas

* Angular 17+ (standalone components)
* RxJS
* HttpClient
* ngx-socket-io
* SCSS (tema escuro)

---

## 🚀 Como rodar o projeto

### 1. Instale as dependências:

```bash
npm install
```

### 2. Inicie o servidor de desenvolvimento:

```bash
ng serve
```

A aplicação estará acessível em: [http://localhost:4200](http://localhost:4200)

---

## 📆 Funcionalidades

* Campo de entrada para digitar a mensagem
* Botão "Enviar Notificação"
* Gera um `messageId` no backend
* Exibe lista de mensagens enviadas com status:

  * AGUARDANDO PROCESSAMENTO
  * PROCESSADO COM SUCESSO
  * FALHA NO PROCESSAMENTO
* Estilo visual com tema escuro e destaques coloridos por status

---

## 🔌 WebSocket

* A aplicação se conecta ao WebSocket do backend via `ngx-socket-io`
* Escuta o evento `statusUpdate`
* Atualiza automaticamente o status da notificação na interface

---

## 🌟 Exemplo de status exibido

```
Tudo bem?
PROCESSADO COM SUCESSO

Olá
FALHA NO PROCESSAMENTO
```

---

## 🧑‍💻 Autor

Stevan Padilha
