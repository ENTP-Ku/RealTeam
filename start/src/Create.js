import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Create() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [uniqueNumber, setUniqueNumber] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      const response = await axios.post('/api/auth/register', {
        id,
        password,
        uniqueNumber
      });

      const data = response.data;
      if (data === '환영합니다. 로그인 후 이용해주세요') {
        navigate('/login');  // 등록 성공 시 로그인 페이지로 이동
      } else {
        alert(data);  // 오류 메시지 출력
      }
    } catch (error) {
      console.error('Error:', error);
      alert('서버에 문제가 발생했습니다.');
    }
  };

  return (
    <div>
      <h2>회원가입</h2>
      <input type="text" placeholder="아이디" value={id} onChange={(e) => setId(e.target.value)} />
      <input type="password" placeholder="비밀번호" value={password} onChange={(e) => setPassword(e.target.value)} />
      <input type="password" placeholder="비밀번호 확인" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
      <input type="text" placeholder="고유번호" value={uniqueNumber} onChange={(e) => setUniqueNumber(e.target.value)} />
      <button onClick={handleRegister}>제출</button>
    </div>
  );
}

export default Create;
