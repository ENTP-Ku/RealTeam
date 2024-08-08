import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        setError('');

        console.log('아이디:', id);
        console.log('비밀번호:', password);

        try {
            const response = await axios.post('http://localhost:8080/api/users/login', { id, password }, { withCredentials: true });

            console.log('응답 상태 코드:', response.status);
            console.log('응답 데이터:', response.data);

            if (response.status === 200) {
                console.log('로그인 성공');
                navigate('/welcome');
                setId('');
                setPassword('');
            } else {
                setError('로그인 실패: 예상치 못한 응답입니다.');
            }
        } catch (error) {
            console.error('로그인 오류:', error);
            if (error.response && error.response.data) {
                setError(error.response.data.message);
            } else {
                setError('로그인 중 오류가 발생했습니다. 다시 시도해 주세요.');
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
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
}

export default Login;
