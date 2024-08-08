// LogOutButton.js
import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LogOutButton() {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await axios.post('http://localhost:8080/api/users/logout', {}, { withCredentials: true });
            navigate('/login');
        } catch (error) {
            console.error('로그아웃 오류:', error);
        }
    };

    return <button onClick={handleLogout}>로그아웃</button>;
}

export default LogOutButton;
