import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { registerRequest, registerSuccess, registerFail } from '../../actions/userActions.ts';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleRegister = async (e) => {
    e.preventDefault();
    dispatch(registerRequest());
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });
      if (!response.ok) {
        throw new Error(`Ошибка регистрации: ${response.status}`);
      }
      const userData = await response.json();
      dispatch(registerSuccess(userData));
      localStorage.setItem('user', JSON.stringify(userData));
      setMessage('Регистрация прошла успешно!');
      navigate('/profile');
    } catch (error) {
      console.error('Registration error:', error);
      dispatch(registerFail(error.message));
      setMessage('Ошибка регистрации. Пожалуйста, попробуйте еще раз.');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
      <h1>Регистрация</h1>
      {message && <div style={{ color: message.includes('успешно') ? 'green' : 'red', marginBottom: '10px' }}>{message}</div>}
      <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', width: '100%', maxWidth: '400px' }}>
        <label style={{ marginBottom: '10px' }}>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ marginLeft: '5px', padding: '5px', width: '100%', boxSizing: 'border-box' }}
          />
        </label>
        <label style={{ marginBottom: '10px' }}>
          Пароль:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ marginLeft: '5px', padding: '5px', width: '100%', boxSizing: 'border-box' }}
          />
        </label>
        <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', cursor: 'pointer', alignSelf: 'flex-end' }}>Зарегистрироваться</button>
      </form>
    </div>
  );
};

export default RegisterPage;
