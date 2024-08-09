import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from './AuthContext';

function Write() {
  const [title, setTitle] = useState(''); // 제목 상태 관리
  const [content, setContent] = useState(''); // 내용 상태 관리
  const { auth } = useContext(AuthContext); // 인증 상태 관리
  const navigate = useNavigate(); // 페이지 이동을 위한 훅

  const handleSubmit = async () => {
    try {
      await axios.post('http://localhost:8080/api/record/write', {
        title,
        content
      }, {
        headers: { Authorization: `Bearer ${auth}` } // 인증 토큰 포함
      });
      navigate('/welcome'); // 글 작성 후 메인 페이지로 이동
    } catch (error) {
      alert('글 작성 실패'); // 글 작성 실패 시 알림
    }
  };

  return (
    <div>
      <h2>Write a Post</h2>
      <input type="text" placeholder="제목" value={title} onChange={(e) => setTitle(e.target.value)} />
      <textarea placeholder="내용" value={content} onChange={(e) => setContent(e.target.value)} />
      <button onClick={handleSubmit}>제출</button>
    </div>
  );
}

export default Write;
