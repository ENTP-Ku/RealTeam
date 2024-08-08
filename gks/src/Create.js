import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Create() {
  const [username, setUsername] = useState(''); // 사용자 이름 상태
  const [password, setPassword] = useState(''); // 비밀번호 상태
  const [confirmPassword, setConfirmPassword] = useState(''); // 비밀번호 확인 상태
  const [uniqueId, setUniqueId] = useState(''); // 고유번호 상태
  const navigate = useNavigate(); // 페이지 이동을 위한 훅

  const handleSubmit = async () => {
    // 비밀번호와 비밀번호 확인이 일치하는지 확인
    if (password !== confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      // 사용자 등록 요청 전송
      const response = await axios.post('http://localhost:8080/api/users/register', {
        username,
        password,
        confirmPassword,
        uniqueId, // 고유번호 데이터 추가
      });

      // 서버 응답에 따른 알림
      alert(response.data);
      navigate('/login'); // 로그인 페이지로 이동
    } catch (error) {
      alert('회원가입 오류');
    }
  };

  return (
    <div>
      <h2>회원가입</h2>
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
      <input
        type="password"
        placeholder="비밀번호 확인"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <input
        type="text"
        placeholder="고유번호"
        value={uniqueId}
        onChange={(e) => setUniqueId(e.target.value)}
      />
      <button onClick={handleSubmit}>제출</button>
    </div>
  );
}

export default Create;
