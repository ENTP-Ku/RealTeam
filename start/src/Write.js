import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Write() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const handleSubmit = () => {
    fetch('/api/records/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title,
        content,
        createdDate: new Date().toISOString(),
        userId: 'qwer'  // 로그인 사용자 아이디를 하드코딩 (실제 애플리케이션에서는 동적 처리 필요)
      })
    })
      .then(() => navigate('/welcome'));
  };

  return (
    <div>
      <h2>글쓰기</h2>
      <input type="text" placeholder="제목" value={title} onChange={(e) => setTitle(e.target.value)} />
      <textarea placeholder="내용" value={content} onChange={(e) => setContent(e.target.value)} />
      <button onClick={handleSubmit}>제출</button>
    </div>
  );
}

export default Write;
