import React, { createContext, useState } from 'react';
import { login, logout, isAuthenticated } from './auth';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(isAuthenticated() ? localStorage.getItem('token') : null); // 초기 인증 상태 설정

  const handleLogin = async (username, password) => {
    const token = await login(username, password);
    setAuth(token); // 로그인 성공 시 인증 토큰 설정
  };

  const handleLogout = () => {
    logout();
    setAuth(null); // 로그아웃 시 인증 상태 초기화
  };

  return (
    <AuthContext.Provider value={{ auth, setAuth: handleLogin, logout: handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};
