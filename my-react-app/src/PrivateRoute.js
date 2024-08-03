// PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  // 로그인 상태를 확인하는 로직을 추가합니다. 
  // 예를 들어, 로컬 스토리지에서 토큰을 확인할 수 있습니다.
  const isAuthenticated = !!localStorage.getItem('authToken');
  
  // 인증되지 않은 사용자는 로그인 페이지로 리다이렉트합니다.
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
