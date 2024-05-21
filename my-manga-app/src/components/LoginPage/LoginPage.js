import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [message, setMessage] = useState(''); // Вы можете удалить эту строку

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Заданные значения для успешного входа
    const correctEmail = 'kim.a@gmail.com';
    const correctPassword = '12345678';
    
    if (email === correctEmail && password === correctPassword) {
      alert('Вы успешно вошли в систему!');
      navigate('/profile'); // Переадресация на страницу профиля
    } else {
      alert('Неверный email или пароль');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
      <h1>Вход в систему</h1>
      <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', width: '100%', maxWidth: '400px' }}>
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
        <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', cursor: 'pointer', alignSelf: 'flex-end' }}>Войти</button>
      </form>
    </div>
  );
};

export default LoginPage;
