import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Welcome() {
  const [records, setRecords] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/records');
        setRecords(response.data);
      } catch (error) {
        alert('데이터 불러오기 오류');
      }
    };

    fetchRecords();
  }, []);

  const handleLogout = () => {
    // 로그아웃 로직
    navigate('/login');
  };

  return (
    <div>
      <h2>메인 게시판</h2>
      <table>
        <thead>
          <tr>
            <th>글번호</th>
            <th>제목</th>
            <th>작성날짜</th>
            <th>아이디</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record) => (
            <tr key={record.id}>
              <td>{record.id}</td>
              <td onClick={() => navigate(`/detail/${record.id}`)}>{record.title}</td>
              <td>{record.createdAt}</td>
              <td>{record.username}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleLogout}>로그아웃</button>
      <button onClick={() => navigate('/write')}>글쓰기</button>
    </div>
  );
}

export default Welcome;
