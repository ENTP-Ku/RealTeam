import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Create = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [uniqueCode, setUniqueCode] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (password !== confirmPassword) {
            setMessage('비밀번호가 일치하지 않습니다.');
            return;
        }

        try {
            const response = await axios.post('/api/create', {
                username,
                password,
                uniqueCode
            });
            setMessage(response.data.message);
            if (response.data.success) {
                navigate('/login');
            }
        } catch (error) {
            console.error('Error during registration', error);
            setMessage('등록 중 오류가 발생했습니다.');
        }
    };

    return (
        <div>
            <h2>회원가입</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    아이디:
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
                </label>
                <br />
                <label>
                    비밀번호:
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </label>
                <br />
                <label>
                    비밀번호 확인:
                    <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                </label>
                <br />
                <label>
                    고유번호:
                    <input type="text" value={uniqueCode} onChange={(e) => setUniqueCode(e.target.value)} required />
                </label>
                <br />
                <button type="submit">제출</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default Create;
