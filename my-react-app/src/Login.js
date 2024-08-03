import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate를 import합니다.

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // useNavigate 훅을 사용하여 navigate 함수를 가져옵니다.

    const handleSubmit = () => {
        fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        })
        .then(response => {
            if (response.ok) {
                navigate('/welcome'); // 로그인 성공 시 Welcome 페이지로 이동합니다.
            } else {
                return response.json().then(data => alert(data.message));
            }
        })
        .catch(error => alert('로그인 중 오류가 발생했습니다.'));
    };

    return (
        <div>
            <input
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="아이디"
            />
            <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="비밀번호"
            />
            <button onClick={handleSubmit}>로그인</button>
            <button onClick={() => navigate('/create')}>회원가입</button> {/* 회원가입 페이지로 이동 */}
        </div>
    );
}

export default Login;
