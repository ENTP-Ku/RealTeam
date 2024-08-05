// src/components/Welcome.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Welcome = () => {
    const [records, setRecords] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRecords = async () => {
            try {
                const response = await axios.get('/api/records');
                setRecords(response.data);
            } catch (err) {
                console.error('Failed to fetch records');
            }
        };

        fetchRecords();
    }, []);

    const handleLogout = () => {
        axios.post('/api/logout').then(() => {
            navigate('/login');
        });
    };

    const handleWrite = () => {
        navigate('/write');
    };

    const handleDetail = (id) => {
        navigate(`/detail/${id}`);
    };

    return (
        <div>
            <h2>Welcome</h2>
            <button onClick={handleLogout}>Logout</button>
            <button onClick={handleWrite}>Write</button>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {records.map(record => (
                        <tr key={record.id}>
                            <td>{record.id}</td>
                            <td>
                                {/* Button styled as a link */}
                                <button
                                    style={{ background: 'none', border: 'none', color: 'blue', textDecoration: 'underline', cursor: 'pointer' }}
                                    onClick={() => handleDetail(record.id)}
                                >
                                    {record.title}
                                </button>
                            </td>
                            <td>{record.date}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Welcome;
