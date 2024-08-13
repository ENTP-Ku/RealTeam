import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem('token'); // 또는 localStorage 사용 가능
    if (token) {
      navigate('/welcome'); // 로그인된 상태라면 welcome 페이지로 리다이렉트
    }
  }, [navigate]);

  const handleLogin = async () => {
    try {      
      const response = await axios.post('/api/login', { username, password });
      if (response.data.token) {
        sessionStorage.setItem('token', response.data.token);
        navigate('/welcome');
      } else if (response.data.loginError) {
        alert(response.data.loginError);
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      <button onClick={() => navigate('/create')}>Sign Up</button>
    </div>
  );
};

export default Login;
