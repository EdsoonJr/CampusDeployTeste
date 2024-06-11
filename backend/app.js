const express = require('express');
const http = require('http');
const cors = require('cors');
const bodyParser = require('body-parser');
const socketIo = require('socket.io');
require('dotenv').config();

const app = express();
const server = http.createServer(app);

// Adicione as opções de configuração CORS para o socket.io
const io = socketIo(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

app.use(cors());
app.use(bodyParser.json());

const port = process.env.PORT || 3001;

// Configuração do socket.io
io.on('connection', (socket) => {
    console.log('Novo cliente conectado');

    socket.on('sendMessage', (message) => {
        console.log('Mensagem recebida do cliente:', message);
        io.emit('receiveMessage', message);
    });

    socket.on('disconnect', () => {
        console.log('Cliente desconectado');
    });
});

server.listen(port, () => {
    console.log(`Servidor Rodando na Porta ${port}`);
});

require('./infra/database/mongo/conection');

const UserController = require('./app/controllers/UserController');

app.post('/users', UserController.createUser);
app.post('/login', UserController.loginUser);
