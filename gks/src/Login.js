import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { login as authLogin, isAuthenticated } from './auth'; // 인증 관련 유틸리티 import

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // 페이지 이동을 위한 훅

  const handleLogin = async (e) => {
    e.preventDefault(); // 기본 폼 제출 동작 방지

    try {
      // 인증 요청을 위해 서버에 POST 요청 보내기
      const response = await axios.post('http://localhost:8080/api/users/login', { username, password });

      if (response && response.data) { // response와 response.data가 정의되어 있는지 확인
        if (response.data === '로그인 성공') {
          localStorage.setItem('user', JSON.stringify({ username })); // 로그인 정보 로컬 스토리지에 저장
          navigate('/welcome'); // 로그인 성공 시 메인 페이지로 이동
        } else if (response.data === '등록되지않은 아이디 입니다.') {
          alert('등록되지 않은 아이디입니다.');
        } else if (response.data === '비밀번호가 맞지않습니다.') {
          alert('비밀번호가 맞지 않습니다.');
        }
      } else {
        console.error('서버 응답이 없습니다.');
      }
    } catch (error) {
      console.error('로그인에 실패했습니다.', error);
    }
  };

  return (
    <div>
      <h2>로그인</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>아이디:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </div>
        <div>
          <label>비밀번호:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit">로그인</button>
      </form>
      <button onClick={() => navigate('/create')}>회원가입</button> {/* 회원가입 버튼 */}
    </div>
  );
}

export default Login; // Login 컴포넌트 export
