import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [id, setId] = useState(''); // 아이디 상태 관리
    const [password, setPassword] = useState(''); // 비밀번호 상태 관리
    const [error, setError] = useState(''); // 오류 메시지 상태 관리
    const navigate = useNavigate(); // 페이지 이동을 위한 useNavigate 훅

    // 로그인 처리 함수
    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:8080/api/users/login', { id, password }); // 로그인 API 호출
            if (response && response.data) {
                // 로그인 성공 시
                navigate('/welcome'); // welcome 페이지로 이동
            } else {
                // 예상치 못한 응답 형식에 대한 처리
                setError('응답 데이터 형식이 올바르지 않습니다.');
            }
        } catch (error) {
            // 서버 오류 또는 다른 문제에 대한 처리
            if (error.response && error.response.data) {
                setError(error.response.data.message); // 서버에서 제공하는 오류 메시지 설정
            } else {
                setError('로그인 중 오류가 발생했습니다. 다시 시도해 주세요.'); // 일반적인 오류 메시지 설정
            }
        }
    };

    return (
        <div>
            <input
                type="text"
                value={id}
                onChange={e => setId(e.target.value)}
                placeholder="아이디"
            />
            <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="비밀번호"
            />
            <button onClick={handleLogin}>로그인</button>
            <button onClick={() => navigate('/register')}>회원가입</button>
            {error && <p style={{ color: 'red' }}>{error}</p>} {/* 오류 메시지 표시 */}
        </div>
    );
}

export default Login;
