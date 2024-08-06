import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function Detail() {
  const [record, setRecord] = useState(null);
  const { postId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // 게시글 상세 정보 가져오기
    fetch(`/api/records/${postId}`)
      .then(response => response.json())
      .then(data => setRecord(data));
  }, [postId]);

  if (!record) return <div>Loading...</div>;

  return (
    <div>
      <h2>{record.title}</h2>
      <p>{record.content}</p>
      <p>작성자: {record.userId}</p>
      <p>작성일: {record.createdDate}</p>
      <button onClick={() => navigate('/welcome')}>목록</button>
    </div>
  );
}

export default Detail;
