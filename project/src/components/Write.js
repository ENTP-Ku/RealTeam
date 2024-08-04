import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Write = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const handleSubmit = () => {
    // 서버에 글쓰기 요청을 보내야 함
    navigate('/welcome');
  };

  return (
    <div>
      <input
        type="text"
        placeholder="제목"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="내용"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button onClick={handleSubmit}>제출</button>
    </div>
  );
};

export default Write;

