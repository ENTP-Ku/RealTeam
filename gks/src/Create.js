import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Create() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [uniqueNumber, setUniqueNumber] = useState('');
  const [error, setError] = useState(''); // 오류 메시지를 저장할 상태
  const navigate = useNavigate(); // 페이지 이동을 위한 훅

  const handleRegister = async (e) => {
    e.preventDefault(); // 기본 폼 제출 동작 방지

    // 비밀번호 확인
    if (password !== confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      // API 호출
      const response = await axios.post('http://localhost:8080/api/users/register', {
        username,
        password,
        uniqueNumber
      });

      // 응답 처리
      if (response && response.data) {
        switch (response.data) {
          case '이미 존재하는 아이디 입니다.':
            alert('이미 존재하는 아이디입니다.');
            break;
          case '이미 가입되어있습니다':
            alert('이미 가입되어있습니다.');
            break;
          case '환영합니다. 로그인 후 이용해주세요':
            alert('환영합니다. 로그인 후 이용해주세요');
            navigate('/login'); // 로그인 페이지로 이동
            break;
          default:
            alert('알 수 없는 오류가 발생했습니다.');
        }
      } else {
        console.error('서버 응답이 없습니다.');
        setError('서버 응답이 없습니다.');
      }
    } catch (error) {
      console.error('회원가입에 실패했습니다.', error);
      setError('회원가입에 실패했습니다.'); // 사용자에게 오류 메시지 표시
    }

    // 입력 필드 초기화
    setUsername('');
    setPassword('');
    setConfirmPassword('');
    setUniqueNumber('');
  };

  return (
    <div>
      <h2>회원가입</h2>
      <form onSubmit={handleRegister}>
        <div>
          <label>아이디:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </div>
        <div>
          <label>비밀번호:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <div>
          <label>비밀번호 확인:</label>
          <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
        </div>
        <div>
          <label>고유번호:</label>
          <input type="text" value={uniqueNumber} onChange={(e) => setUniqueNumber(e.target.value)} required />
        </div>
        <button type="submit">제출</button>
      </form>
      {error && <p>{error}</p>} {/* 오류 메시지 표시 */}
    </div>
  );
}

export default Create; // Create 컴포넌트 export
