import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Create() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [uniqueNumber, setUniqueNumber] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async () => {
        if (password !== confirmPassword) {
            alert('비밀번호가 일치하지 않습니다.');
            return;
        }
        try {
            // 요청 데이터 확인
            console.log('Sending data:', { username, password, confirmPassword, uniqueNumber });

            // 서버에 요청을 보내고 응답을 받음
            const response = await axios.post('http://localhost:8080/api/users/register', { username, password, confirmPassword, uniqueNumber });
            
            // 서버 응답이 성공적이면 알림을 표시하고 로그인 페이지로 이동
            alert(response.data);
            navigate('/login');
        } catch (error) {
            // 오류 발생 시, 콘솔에 오류 정보를 출력
            console.error('Error during registration:', error);
            // 오류 메시지를 사용자에게 알림으로 표시
            alert(error.response?.data || '회원가입에 실패했습니다.');
        }
    };

    return (
        <div>
            <input type="text" placeholder="아이디" onChange={e => setUsername(e.target.value)} />
            <input type="password" placeholder="비밀번호" onChange={e => setPassword(e.target.value)} />
            <input type="password" placeholder="비밀번호 확인" onChange={e => setConfirmPassword(e.target.value)} />
            <input type="text" placeholder="고유번호" onChange={e => setUniqueNumber(e.target.value)} />
            <button onClick={handleSubmit}>제출</button>
        </div>
    );
}

export default Create;
