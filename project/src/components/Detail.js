// src/components/Detail.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Detail = () => {
    const [record, setRecord] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRecord = async () => {
            try {
                const response = await axios.get(`/api/record/${id}`);
                setRecord(response.data);
            } catch (err) {
                console.error('Failed to fetch record');
            }
        };

        fetchRecord();
    }, [id]);

    const handleBack = () => {
        navigate('/welcome');
    };

    return (
        <div>
            <h2>Detail</h2>
            {record ? (
                <div>
                    <h3>{record.title}</h3>
                    <p>{record.content}</p>
                    <p>By {record.username} on {record.date}</p>
                    <button onClick={handleBack}>Back</button>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default Detail;
