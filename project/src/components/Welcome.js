import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios'; // axios를 사용하여 서버와 통신

const Welcome = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [records, setRecords] = useState([]); // Record 데이터를 저장할 상태

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleWrite = () => {
    navigate('/write');
  };

  // 서버에서 Record 데이터를 가져오는 함수
  const fetchRecords = async () => {
    try {
      const response = await axios.get('/api/records'); // 서버의 Record 데이터 API
      setRecords(response.data); // 상태 업데이트
    } catch (error) {
      console.error('데이터를 가져오는 중 오류 발생:', error);
    }
  };

  useEffect(() => {
    fetchRecords(); // 컴포넌트가 마운트될 때 데이터 가져오기
  }, []);

  return (
    <div>
      <button onClick={handleLogout}>로그아웃</button>
      <button onClick={handleWrite}>글쓰기</button>
      <div>
        <h2>Record 목록</h2>
        <table>
          <thead>
            <tr>
              <th>제목</th>
              <th>내용</th>
              <th>작성일</th>
              <th>작성자</th>
            </tr>
          </thead>
          <tbody>
            {records.map((record) => (
              <tr key={record.id}>
                <td>{record.title}</td>
                <td>{record.content}</td>
                <td>{new Date(record.createdDate).toLocaleDateString()}</td>
                <td>{record.username}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Welcome;
