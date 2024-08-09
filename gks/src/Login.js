import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import axios from 'axios';

function Login() {
  const [username, setUsername] = useState(''); // 사용자 이름 상태 관리
  const [password, setPassword] = useState(''); // 비밀번호 상태 관리
  const { setAuth } = useContext(AuthContext); // 인증 상태 관리
  const navigate = useNavigate(); // 페이지 이동을 위한 훅

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/user/login', { username, password });
      setAuth(response.data.token); // 인증 토큰 설정
      navigate('/welcome'); // 로그인 후 메인 페이지로 이동
    } catch (error) {
      alert('로그인 실패'); // 로그인 실패 시 알림
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input type="text" placeholder="아이디" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input type="password" placeholder="비밀번호" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>로그인</button>
      <button onClick={() => navigate('/create')}>회원가입</button>
    </div>
  );
}

export default Login;
