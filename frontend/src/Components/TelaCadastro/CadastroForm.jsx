import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './CadastroForm.module.css';

const CadastroForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('');
  const [gender, setGender] = useState('');
  const [phone, setPhone] = useState('');
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'name') setName(value);
    if (name === 'email') setEmail(value);
    if (name === 'password') setPassword(value);
    if (name === 'userType') setUserType(value);
    if (name === 'gender') setGender(value);
    if (name === 'phone') setPhone(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const userData = {
      nome: name,
      email,
      senha: password,
      tipoUsuario: userType,
      genero: gender,
      telefone: phone
    };
    
    try {
      const response = await axios.post('http://localhost:3001/users', userData);
      navigate('/main'); // Redirecionar para a página principal após o cadastro
    } catch (error) {
      // Tratamento de erro
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.cadastroForm}>
        <h2 className={styles.cadastroTitle}>Cadastro</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor='name'>Nome:</label>
            <input 
              type='text' 
              id='name' 
              name='name' 
              value={name} 
              onChange={handleChange} 
              required 
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor='email'>E-mail:</label>
            <input 
              type='email' 
              id='email' 
              name='email' 
              value={email} 
              onChange={handleChange} 
              required 
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor='password'>Senha:</label>
            <input 
              type='password' 
              id='password' 
              name='password' 
              value={password} 
              onChange={handleChange} 
              required 
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor='userType'>Tipo de usuário:</label>
            <select 
              id='userType' 
              name='userType' 
              value={userType} 
              onChange={handleChange} 
              required
            >
              <option value=''>Selecione...</option>
              <option value='responsavel'>Responsável</option>
              <option value='estudante'>Estudante</option>
              <option value='administrador'>Administrador</option>
            </select>
          </div>
          <div className={styles.formGroup}>
            <label>Gênero:</label>
            <div>
              <label>
                <input 
                  type='radio' 
                  name='gender' 
                  value='masculino' 
                  checked={gender === 'masculino'} 
                  onChange={handleChange} 
                  required 
                />
                Masculino
              </label>
              <label>
                <input 
                  type='radio' 
                  name='gender' 
                  value='feminino' 
                  checked={gender === 'feminino'} 
                  onChange={handleChange} 
                  required 
                />
                Feminino
              </label>
            </div>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor='phone'>Telefone:</label>
            <input 
              type='tel' 
              id='phone' 
              name='phone' 
              value={phone} 
              onChange={handleChange} 
              required 
            />
          </div>
          <div className={styles.formGroup} style={{ textAlign: 'center' }}>
            <button type='submit'>Cadastrar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CadastroForm;
