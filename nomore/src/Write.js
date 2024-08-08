import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Write() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async () => {
        try {
            const userId = 'qwer'; // 예제 ID, 실제로는 인증된 사용자 ID로 대체해야 함
            await axios.post('http://localhost:8080/api/records/create', { title, content, userId });
            navigate('/welcome');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="제목" />
            <textarea value={content} onChange={e => setContent(e.target.value)} placeholder="내용" />
            <button onClick={handleSubmit}>제출</button>
        </div>
    );
}

export default Write;
