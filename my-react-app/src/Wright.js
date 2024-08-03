import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate를 import합니다.

function Wright() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate(); // useNavigate 훅을 사용하여 navigate 함수를 가져옵니다.

    const handleSubmit = () => {
        const record = {
            title,
            content,
        };

        fetch('/api/records', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(record),
        })
        .then(response => {
            if (response.ok) {
                navigate('/welcome'); // 글쓰기 성공 후 Welcome 페이지로 이동합니다.
            } else {
                return response.json().then(data => alert(data.message));
            }
        })
        .catch(error => alert('글쓰기 중 오류가 발생했습니다.'));
    };

    return (
        <div>
            <input
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="제목"
            />
            <textarea
                value={content}
                onChange={e => setContent(e.target.value)}
                placeholder="내용"
            />
            <button onClick={handleSubmit}>제출</button>
        </div>
    );
}

export default Wright;
