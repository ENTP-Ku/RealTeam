// 로그인 및 인증 상태 관리 유틸리티
import axios from 'axios';

export const login = async (id, password) => {
    try {
        await axios.post('http://localhost:8080/api/users/login', { id, password });
        localStorage.setItem('authenticated', 'true');
    } catch (error) {
        alert(error.response.data.message);
    }
};

export const isAuthenticated = () => {
    return localStorage.getItem('authenticated') === 'true';
};

export const logout = () => {
    localStorage.removeItem('authenticated');
};
