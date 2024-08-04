import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Create = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [uniqueCode, setUniqueCode] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (password !== passwordConfirm) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }

    // 서버에 가입 요청을 보내야 합니다.
    // 성공적으로 가입하면
    navigate('/login');
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
