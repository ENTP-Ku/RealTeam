import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

const handleLogin = async () => {
    try {
        const response = await axios.post('http://localhost:8080/api/users/login', { username, password });
        if (response.status === 200) {
            const token = response.data;
            console.log("Token received:", token); // 토큰 출력
            localStorage.setItem('token', token);
            navigate('/welcome');
        }
    } catch (error) {
        alert(error.response?.data || '로그인에 실패했습니다.');
    }
};

    return (
        <div>
            <input type="text" placeholder="아이디" onChange={e => setUsername(e.target.value)} />
            <input type="password" placeholder="비밀번호" onChange={e => setPassword(e.target.value)} />
            <button onClick={handleLogin}>로그인</button>
            <button onClick={() => navigate('/create')}>회원가입</button>
        </div>
    );
}

export default Login;
