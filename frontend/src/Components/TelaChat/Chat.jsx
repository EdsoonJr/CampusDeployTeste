import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './Chat.css';

const socket = io('http://localhost:3001');

const Chat = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Conectado ao servidor');
    });

    socket.on('receiveMessage', (message) => {
      console.log('Mensagem recebida do servidor:', message);
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off('connect');
      socket.off('receiveMessage');
    };
  }, []);

  const handleMessageSend = () => {
    if (message.trim()) {
      console.log('Enviando mensagem para o servidor:', message);
      socket.emit('sendMessage', message);
      setMessage('');
    }
  };

  return (
    <section id='chat'>
      <div className="chat-container">
        <h1>Chat</h1>
        <div className="messages" id="messages">
          {messages.map((msg, index) => (
            <div key={index} className={`message ${index % 2 === 0 ? 'left' : 'right'}`}>
              <div className="icon">
                <i className="fa fa-user-circle-o" aria-hidden="true"></i>
              </div>
              <div className="content">{msg}</div>
            </div>
          ))}
        </div>
        <div className="input-container">
          <input
            id="messageInput"
            placeholder="Digite sua mensagem"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleMessageSend()}
          />
          <button onClick={handleMessageSend}>Enviar</button>
        </div>
      </div>
    </section>
  );
};

export default Chat;
