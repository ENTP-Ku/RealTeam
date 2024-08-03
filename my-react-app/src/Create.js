import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // useHistory 대신 useNavigate를 import합니다.

function Create() {
    const navigate = useNavigate(); // useNavigate 훅을 사용하여 navigate 함수를 가져옵니다.
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [uniqueNumber, setUniqueNumber] = useState('');

    const handleSubmit = () => {
        if (password !== confirmPassword) {
            alert('비밀번호가 일치하지 않습니다.');
            return;
        }

        fetch('/api/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password, uniqueNumber }),
        })
        .then(response => {
            if (response.status === 400) {
                return response.json().then(data => alert(data.message));
            }
            return response.json();
        })
        .then(data => {
            alert('환영합니다. 로그인 후 이용해주세요');
            navigate('/login'); // 로그인 페이지로 이동합니다.
        })
        .catch(error => alert('회원가입 중 오류가 발생했습니다.'));
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
            <input
                type="password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                placeholder="비밀번호 확인"
            />
            <input
                type="text"
                value={uniqueNumber}
                onChange={e => setUniqueNumber(e.target.value)}
                placeholder="고유번호"
            />
            <button onClick={handleSubmit}>제출</button>
        </div>
    );
}

export default Create;
