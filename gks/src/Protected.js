import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Protected = () => {
    const [data, setData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await axios.get('http://localhost:8080/protected', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setData(response.data);
            } catch (error) {
                console.error('Failed to fetch protected data', error);
                navigate('/'); // 인증 실패 시 로그인 페이지로 리디렉션
            }
        };

        fetchData();
    }, [navigate]);

    return (
        <div>
            <h1>Protected Page</h1>
            {data ? <p>{data}</p> : <p>Loading...</p>}
        </div>
    );
};

export default Protected;
