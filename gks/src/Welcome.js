import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Welcome() {
    const [records, setRecords] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // 저장된 JWT 토큰을 가져옴
        const token = localStorage.getItem('token');

        // 서버에 요청 시 토큰을 헤더에 포함
        axios.get('http://localhost:8080/api/records', {
            headers: { Authorization: `Bearer ${token}` } // 토큰을 요청 헤더에 포함
        })
        .then(response => setRecords(response.data))
        .catch(() => navigate('/login'));
    }, [navigate]);

    const handleLogout = () => {
        // 로그아웃 시 토큰 삭제
        localStorage.removeItem('token');
        axios.post('http://localhost:8080/api/auth/logout') // 서버의 절대 URL로 수정
            .then(() => navigate('/login'));
    };

    const handleWrite = () => {
        navigate('/write');
    };

    return (
        <div>
            <button onClick={handleLogout}>로그아웃</button>
            <button onClick={handleWrite}>글쓰기</button>
            <table>
                <thead>
                    <tr>
                        <th>제목</th>
                        <th>작성날짜</th>
                        <th>아이디</th>
                    </tr>
                </thead>
                <tbody>
                    {records.map(record => (
                        <tr key={record.id}>
                            <td><a href={`/detail/${record.id}`}>{record.title}</a></td>
                            <td>{record.createdDate}</td>
                            <td>{record.username}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Welcome;
