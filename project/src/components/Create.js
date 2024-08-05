import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Create = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [uniqueCode, setUniqueCode] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (password !== passwordConfirm) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      const response = await axios.post('/api/register', {
        username,
        password,
        uniqueCode
      });

      if (response.data.success) {
        navigate('/login');
      } else {
        setError(response.data.message || '회원가입에 실패했습니다.');
      }
    } catch (error) {
      console.error('회원가입 중 오류 발생:', error);
      setError('회원가입 중 오류가 발생했습니다.');
    }
  };

  return (
    <div>
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
        value={passwordConfirm}
        onChange={(e) => setPasswordConfirm(e.target.value)}
      />
      <input
        type="text"
        placeholder="고유번호"
        value={uniqueCode}
        onChange={(e) => setUniqueCode(e.target.value)}
      />
      <button onClick={handleSubmit}>제출</button>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Create;
