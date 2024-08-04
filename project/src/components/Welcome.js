import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Welcome = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleWrite = () => {
    navigate('/write');
  };

  return (
    <div>
      <button onClick={handleLogout}>로그아웃</button>
      <button onClick={handleWrite}>글쓰기</button>
      {/* Record 데이터를 가져와서 테이블에 렌더링해야 함 */}
    </div>
  );
};

export default Welcome;
