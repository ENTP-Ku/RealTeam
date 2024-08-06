import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    // 로그인 요청
    fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, password })
    })
      .then(response => response.json())
      .then(data => {
        if (data === '로그인 성공') {
          // 로그인 성공 시 Welcome 페이지로 이동
          navigate('/welcome');
        } else {
          // 오류 메시지 출력
          alert(data);
        }
      });
  };

  return (
    <div>
      <h2>로그인</h2>
      <input type="text" placeholder="아이디" value={id} onChange={(e) => setId(e.target.value)} />
      <input type="password" placeholder="비밀번호" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>로그인</button>
      <button onClick={() => navigate('/create')}>회원가입</button>
    </div>
  );
}

export default Login;
