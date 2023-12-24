
const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Configurar rota RESTful
app.get('/api/data', (req, res) => {
  // Lógica para obter dados
  const data = { message: 'Dados da API RESTful' };
  res.json(data);
});

// Configurar WebSocket
wss.on('connection', (ws) => {
  console.log('Conexão WebSocket estabelecida');

  // Enviar mensagem para o cliente WebSocket
  ws.send('Conexão estabelecida com sucesso!');

  // Lidar com mensagens recebidas do cliente WebSocket
  ws.on('message', (message) => {
    console.log(`Mensagem recebida: ${message}`);
  });
});

// Iniciar o servidor
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor escutando na porta ${PORT}`);
});