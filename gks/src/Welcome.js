import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Welcome() {
  const [records, setRecords] = useState([]); // 게시글 상태
  const navigate = useNavigate(); // 페이지 이동을 위한 훅

  useEffect(() => {
    const fetchRecords = async () => {
      const response = await axios.get('http://localhost:8080/api/records/all');
      setRecords(response.data); // 모든 게시글 가져오기
    };

    fetchRecords();
  }, []);

  const handleLogout = () => {
    // 로그아웃 로직 추가 필요
    navigate('/login'); // 로그아웃 시 로그인 페이지로 이동
  };

  const handleWrite = () => {
    navigate('/write'); // 글쓰기 페이지로 이동
  };

  return (
    <div>
      <h2>Welcome</h2>
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
          {records.map(record => (
            <tr key={record.id}>
              <td>{record.id}</td>
              <td><a onClick={() => navigate(`/detail/${record.id}`)}>{record.title}</a></td>
              <td>{record.createdDate}</td>
              <td>{record.username}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleLogout}>로그아웃</button> {/* 로그아웃 버튼 */}
      <button onClick={handleWrite}>글쓰기</button> {/* 글쓰기 버튼 */}
    </div>
  );
}

export default Welcome; // Welcome 컴포넌트 export
