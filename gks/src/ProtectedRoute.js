import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './auth'; // auth.js와 동일한 디렉토리에 있어야 합니다.

const ProtectedRoute = ({ element }) => {
  const { auth } = useAuth();
  return auth ? element : <Navigate to="/login" />;
};

export default ProtectedRoute;
