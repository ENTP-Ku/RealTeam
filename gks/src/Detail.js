import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Detail() {
  const { id } = useParams();
  const [record, setRecord] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecord = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/records/${id}`);
        setRecord(response.data);
      } catch (error) {
        alert('데이터 불러오기 오류');
      }
    };

    fetchRecord();
  }, [id]);

  return (
    <div>
      {record && (
        <>
          <h2>{record.title}</h2>
          <p>{record.content}</p>
          <p>작성자: {record.username}</p>
          <p>작성 날짜: {record.createdAt}</p>
          <button onClick={() => navigate('/welcome')}>목록</button>
        </>
      )}
    </div>
  );
}

export default Detail;
