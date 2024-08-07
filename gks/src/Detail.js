import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Detail() {
  const { id } = useParams(); // URL 파라미터에서 id 가져오기
  const [record, setRecord] = useState({}); // 게시글 상태
  const navigate = useNavigate(); // 페이지 이동을 위한 훅

  useEffect(() => {
    const fetchRecord = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/records/${id}`);
        setRecord(response.data); // 게시글 데이터 가져오기
      } catch (error) {
        console.error('게시글을 가져오는 데 실패했습니다.', error);
      }
    };

    fetchRecord();
  }, [id]);

  return (
    <div>
      <h2>{record.title}</h2>
      <p>{record.username}</p>
      <p>{record.createdDate}</p>
      <p>{record.content}</p>
      <button onClick={() => navigate('/welcome')}>돌아가기</button> {/* 돌아가기 버튼 */}
    </div>
  );
}

export default Detail; // Detail 컴포넌트 export
