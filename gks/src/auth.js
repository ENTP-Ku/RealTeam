import axios from 'axios';

export const login = async (username, password) => {
  try {
    const response = await axios.post('http://localhost:8080/api/users/login', { username, password });
    if (response.data === "로그인 성공") {
      localStorage.setItem('user', JSON.stringify({ username })); // 로그인 정보 로컬 스토리지에 저장
      return true;
    }
    return false;
  } catch (error) {
    alert('로그인에 실패했습니다.');
    return false;
  }
};

export const logout = () => {
  localStorage.removeItem('user'); // 로그아웃 시 로컬 스토리지에서 로그인 정보 제거
};

export const isAuthenticated = () => {
  return localStorage.getItem('user') !== null; // 로그인 상태 확인
};
