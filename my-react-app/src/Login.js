// Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    axios.post('/api/login', { username, password })
      .then(response => {
        // 로그인 성공 시, 응답에서 토큰을 저장합니다.
        localStorage.setItem('authToken', response.data.token);
        navigate('/welcome'); // 로그인 성공 후 Welcome 페이지로 이동
      })
      .catch(error => {
        console.error('Error logging in:', error);
      });
  };

  return (
    <div>
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      <button onClick={() => navigate('/create')}>Sign Up</button>
    </div>
  );
};

export default Login;
