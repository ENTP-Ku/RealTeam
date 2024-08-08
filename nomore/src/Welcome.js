import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Welcome() {
    const [records, setRecords] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRecords = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/records');
                setRecords(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchRecords();
    }, []);

    const handleLogout = () => {
        // 로그아웃 처리 후 로그인 페이지로 이동
        navigate('/');
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
                            <td>{record.userId}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Welcome;
