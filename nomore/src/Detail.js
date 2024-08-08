import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function Detail() {
    const { id } = useParams();
    const [record, setRecord] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRecord = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/records/${id}`);
                setRecord(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchRecord();
    }, [id]);

    const handleBack = () => {
        navigate('/welcome');
    };

    return (
        <div>
            <h1>{record.title}</h1>
            <p>{record.content}</p>
            <p>작성자: {record.userId}</p>
            <p>작성 날짜: {record.createdDate}</p>
            <button onClick={handleBack}>목록으로</button>
        </div>
    );
}

export default Detail;
