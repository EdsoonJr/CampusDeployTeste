import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './TelaLogin.css';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'email') setEmail(value);
    if (name === 'password') setPassword(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const loginData = { email, senha: password }; // Aqui estamos usando 'senha' para compatibilidade com o backend
    console.log('Dados do formulário de login:', loginData);

    try {
      const response = await axios.post('https://campus-deploy-api.vercel.app/login', loginData);
      console.log('Resposta do servidor:', response.data);
      navigate('/main'); // Redirecionar para a página principal após o login
    } catch (error) {
      console.error('Erro ao realizar login:', error);
      if (error.response) {
        console.error('Detalhes do erro:', error.response.data);
      }
    }
  };

  return (
    <div>
      <div className='background'>
        <img src="https://imgur.com/iqIiCIt.jpg" alt="" />
      </div>
      <div className='logo'>
        <img src="https://imgur.com/a3dzQjV.png" alt="" />
      </div>
      <div className="login-form">
        <h2 style={{ textAlign: "center", color: "white" }}>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email" style={{ color: "white" }}>E-mail:</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              value={email} 
              onChange={handleChange} 
              required 
              style={{ color: "white" }} 
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" style={{ color: "white" }}>Senha:</label>
            <input 
              type="password" 
              id="password" 
              name="password" 
              value={password} 
              onChange={handleChange} 
              required 
              style={{ color: "white" }} 
            />
          </div>
          <div className="form-group" style={{ textAlign: "center" }}>
            <button type="submit">Entrar</button>
          </div>
          <div className="form-group" style={{ textAlign: "center" }}>
            <Link to="/cadastro" style={{ color: "white", textDecoration: "none" }}>
              <button type='submit'>Cadastrar</button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
