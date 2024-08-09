import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

function LogoutButton() {
  const { logout } = useContext(AuthContext); // 로그아웃 함수 가져오기
  const navigate = useNavigate(); // 페이지 이동을 위한 훅

  const handleLogout = () => {
    logout(); // 로그아웃 실행
    navigate('/'); // 로그인 페이지로 이동
  };

  return (
    <button onClick={handleLogout}>로그아웃</button>
  );
}

export default LogoutButton;
