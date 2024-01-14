const express = require('express')
const cors = require('cors')
const http = require('http');
const WebSocket = require('ws');
require('dotenv').config()

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const port = process.env.PORT || 3000

app.use(express.json())
app.use(cors())

const productRouter = require('./routes/Product')

app.use('/', productRouter)

app.use('/uploads', express.static('uploads'))

// Lógica WebSocket
wss.on('connection', (ws) => {
    console.log('WebSocket connected');
  
    // Evento de mensagem WebSocket
    ws.on('message', (message) => {
      console.log(`WebSocket message received: ${message}`);
  
      // Lógica adicional para manipular a mensagem WebSocket, se necessário
    });
  
    // Evento de fechamento WebSocket
    ws.on('close', () => {
      console.log('WebSocket disconnected');
    });

    // Enviar mensagem para o cliente após algum evento no servidor
    // Exemplo: enviar uma mensagem após 5 segundos
    setTimeout(() => {
      ws.send('Mensagem do servidor para o cliente');
    }, 5000);
  });

server.listen(port, () => {
    console.log('server initialized')
    require('./db')
})
