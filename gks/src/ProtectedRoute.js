import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from './auth';

function ProtectedRoute({ children }) {
  return isAuthenticated() ? children : <Navigate to="/" />; // 인증된 경우에만 접근 허용
}

export default ProtectedRoute;
