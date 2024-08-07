import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Write() {
  const [title, setTitle] = useState(''); // 제목 상태
  const [content, setContent] = useState(''); // 내용 상태
  const navigate = useNavigate(); // 페이지 이동을 위한 훅

  const handleSubmit = async () => {
    const record = {
      title,
      content,
      username: '현재 사용자 이름을 가져오는 로직 필요', // 실제 로그인한 사용자 이름을 가져오는 로직 필요
    };

    try {
      await axios.post('http://localhost:8080/api/records/create', record);
      navigate('/welcome'); // 글 작성 후 메인 페이지로 이동
    } catch (error) {
      alert('게시글 작성에 실패했습니다.'); // 에러 메시지 알림
    }
  };

  return (
    <div>
      <h2>Write</h2>
      <input type="text" placeholder="제목" value={title} onChange={(e) => setTitle(e.target.value)} />
      <textarea placeholder="내용" value={content} onChange={(e) => setContent(e.target.value)} />
      <button onClick={handleSubmit}>제출</button> {/* 제출 버튼 */}
    </div>
  );
}

export default Write; // Write 컴포넌트 export
