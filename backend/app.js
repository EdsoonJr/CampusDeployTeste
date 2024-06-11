const express = require('express');
const http = require('http');
const cors = require('cors');
const bodyParser = require('body-parser');
const socketIo = require('socket.io');
require('dotenv').config();

const app = express();
const server = http.createServer(app);

const allowedOrigins = ['https://campus-deploy-front.vercel.app'];

// Configure CORS for Express
app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin like mobile apps or curl requests
        if (!origin) {
            console.log('Request without origin allowed');
            return callback(null, true);
        }
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            console.error(msg, origin);
            return callback(new Error(msg), false);
        }
        console.log('CORS allowed for origin:', origin);
        return callback(null, true);
    }
}));

app.use(bodyParser.json());

const port = process.env.PORT || 3001;

// Configure CORS for Socket.IO
const io = socketIo(server, {
    cors: {
        origin: allowedOrigins,
        methods: ["GET", "POST"],
        credentials: true
    }
});

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

app.post('/users', (req, res) => {
    console.log('Recebendo requisição POST para /users com body:', req.body);
    UserController.createUser(req, res);
});

app.post('/login', (req, res) => {
    console.log('Recebendo requisição POST para /login com body:', req.body);
    UserController.loginUser(req, res);
});
