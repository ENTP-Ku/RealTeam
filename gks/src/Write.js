import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Write() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      await axios.post('http://localhost:8080/api/records/create', {
        title,
        content,
        username: '현재 로그인된 사용자 아이디', // 실제 사용자 아이디로 대체 필요
      });

      navigate('/welcome');
    } catch (error) {
      alert('글 작성 오류');
    }
  };

  return (
    <div>
      <h2>글쓰기</h2>
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
}

export default Write;
