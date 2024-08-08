import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Create() {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [uniqueNumber, setUniqueNumber] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = async () => {
        try {
            const response = await axios.post('http://localhost:8080/api/users/register', {
                id,
                password,
                confirmPassword,
                uniqueNumber
            });

            alert('회원가입이 완료되었습니다.');
            navigate('/login');
        } catch (error) {
            if (error.response) {
                // 서버 오류 메시지 처리
                setError(error.response.data);
            } else {
                // 네트워크 오류 처리
                setError('알 수 없는 오류가 발생했습니다.');
            }
        }
    };

    return (
        <div>
            <input type="text" value={id} onChange={e => setId(e.target.value)} placeholder="아이디" />
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="비밀번호" />
            <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="비밀번호 확인" />
            <input type="text" value={uniqueNumber} onChange={e => setUniqueNumber(e.target.value)} placeholder="고유 번호" />
            <button onClick={handleRegister}>제출</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
}

export default Create;
