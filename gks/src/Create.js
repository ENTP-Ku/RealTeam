import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Create() {
  const [username, setUsername] = useState(''); // 사용자 이름 상태 관리
  const [password, setPassword] = useState(''); // 비밀번호 상태 관리
  const [confirmPassword, setConfirmPassword] = useState(''); // 비밀번호 확인 상태 관리
  const [uniqueNumber, setUniqueNumber] = useState(''); // 고유번호 상태 관리
  const navigate = useNavigate(); // 페이지 이동을 위한 훅

  const handleCreate = async () => {
    if (password !== confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.'); // 비밀번호 불일치 시 알림
      return;
    }
    try {
      const response = await axios.post('http://localhost:8080/api/user/register', {
        username,
        password,
        confirmPassword,
        uniqueNumber
      });
      alert(response.data); // 회원가입 성공 시 메시지 출력
      navigate('/'); // 로그인 페이지로 이동
    } catch (error) {
      alert('회원가입 실패'); // 회원가입 실패 시 알림
    }
  };

  return (
    <div>
      <h2>Create Account</h2>
      <input type="text" placeholder="아이디" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input type="password" placeholder="비밀번호" value={password} onChange={(e) => setPassword(e.target.value)} />
      <input type="password" placeholder="비밀번호 확인" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
      <input type="text" placeholder="고유번호" value={uniqueNumber} onChange={(e) => setUniqueNumber(e.target.value)} />
      <button onClick={handleCreate}>제출</button>
    </div>
  );
}

export default Create;
