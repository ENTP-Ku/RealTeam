import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Write() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async () => {
        try {
            const response = await axios.post('http://localhost:8080/api/records', { title, content });
            alert(response.data);
            navigate('/welcome');
        } catch (error) {
            alert('문제가 발생했습니다.');
        }
    };

    return (
        <div>
            <input type="text" placeholder="제목" onChange={e => setTitle(e.target.value)} />
            <textarea placeholder="내용" onChange={e => setContent(e.target.value)} />
            <button onClick={handleSubmit}>제출</button>
        </div>
    );
}

export default Write;
