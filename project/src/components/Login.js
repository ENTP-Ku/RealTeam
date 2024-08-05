import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('/api/login', { username, password });
      const { success, message } = response.data;

      if (success) {
        // 로그인 성공 시, 홈 페이지로 리다이렉트
        navigate('/welcome');
      } else {
        // 로그인 실패 시, 오류 메시지 설정
        setErrorMessage(message);
      }
    } catch (error) {
      console.error('로그인 중 오류 발생:', error);
      setErrorMessage('로그인 중 오류가 발생했습니다.');
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>로그인</h1>
      <input
        type="text"
        placeholder="아이디"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>로그인</button>
      <button onClick={() => navigate('/create')}>회원가입</button>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
};

export default Login;
