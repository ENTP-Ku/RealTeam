import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from './AuthContext';

function Detail() {
  const [record, setRecord] = useState(null); // 상세 게시글 상태 관리
  const { id } = useParams(); // URL 파라미터로부터 글번호 가져오기
  const { auth } = useContext(AuthContext); // 인증 상태 관리
  const navigate = useNavigate(); // 페이지 이동을 위한 훅

  useEffect(() => {
    const fetchRecord = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/record/detail/${id}`, {
          headers: { Authorization: `Bearer ${auth}` } // 인증 토큰 포함
        });
        setRecord(response.data); // 가져온 게시글 설정
      } catch (error) {
        alert('로그인 해주세요'); // 로그인되지 않은 경우 알림
        navigate('/'); // 로그인 페이지로 이동
      }
    };
    fetchRecord();
  }, [id, auth, navigate]);

  return (
    <div>
      {record ? (
        <>
          <h2>{record.title}</h2>
          <p>{record.content}</p>
          <p>작성자: {record.username}</p>
          <p>작성일: {record.createdDate}</p>
          <button onClick={() => navigate('/welcome')}>목록으로</button>
        </>
      ) : (
        <p>로딩 중...</p>
      )}
    </div>
  );
}

export default Detail;
