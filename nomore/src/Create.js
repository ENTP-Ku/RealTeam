import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Create() {
    const [id, setId] = useState(''); // 아이디 상태
    const [password, setPassword] = useState(''); // 비밀번호 상태
    const [confirmPassword, setConfirmPassword] = useState(''); // 비밀번호 확인 상태
    const [uniqueNumber, setUniqueNumber] = useState(''); // 고유 번호 상태
    const [error, setError] = useState(''); // 오류 메시지 상태
    const navigate = useNavigate(); // 페이지 이동을 위한 useNavigate 훅

    const handleRegister = async () => {
        try {
            const response = await axios.post('http://localhost:8080/api/users/register', {
                id,
                password,
                confirmPassword,
                uniqueNumber
            });

            // 성공 시 로그인 페이지로 이동
            alert('회원가입이 완료되었습니다.');
            navigate('/login');
        } catch (error) {
            if (error.response) {
                // 서버에서 반환된 오류 메시지를 처리합니다.
                setError(error.response.data.message);
            } else {
                // 네트워크 오류나 다른 오류를 처리합니다.
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
