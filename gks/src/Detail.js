import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function Detail() {
    const { id } = useParams();
    const [record, setRecord] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:8080/api/records/${id}`) // 서버의 절대 URL로 수정
            .then(response => setRecord(response.data))
            .catch(() => navigate('/login'));
    }, [id, navigate]);

    return (
        <div>
            {record ? (
                <div>
                    <h1>{record.title}</h1>
                    <p>{record.content}</p>
                    <p>작성자: {record.username}</p>
                    <p>작성일: {record.createdDate}</p>
                    <button onClick={() => navigate('/welcome')}>목록</button>
                </div>
            ) : (
                <p>로딩중...</p>
            )}
        </div>
    );
}

export default Detail;
