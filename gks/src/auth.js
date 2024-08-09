import axios from 'axios';

export const login = async (username, password) => {
  const response = await axios.post('http://localhost:8080/api/user/login', { username, password });
  const token = response.data.token;
  localStorage.setItem('token', token); // 토큰을 로컬 스토리지에 저장
  return token;
};

export const logout = () => {
  localStorage.removeItem('token'); // 로그아웃 시 토큰 제거
};

export const isAuthenticated = () => {
  return localStorage.getItem('token') !== null; // 토큰이 있는지 확인
};
