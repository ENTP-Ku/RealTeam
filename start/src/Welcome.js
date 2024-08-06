import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Welcome() {
  const [records, setRecords] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // 로그인 상태 확인
    fetch('/api/auth/check')
      .then(response => {
        if (response.status !== 200) {
          navigate('/login');
        }
      });

    // 게시글 목록 가져오기
    fetch('/api/records/user/qwer')  // 로그인한 사용자의 아이디를 하드코딩 (실제 애플리케이션에서는 동적 처리 필요)
      .then(response => response.json())
      .then(data => setRecords(data));
  }, [navigate]);

  const handleLogout = () => {
    // 로그아웃 요청
    fetch('/api/auth/logout')
      .then(() => navigate('/login'));
  };

  return (
    <div>
      <h2>게시판</h2>
      <button onClick={handleLogout}>로그아웃</button>
      <button onClick={() => navigate('/write')}>글쓰기</button>
      <table>
        <thead>
          <tr>
            <th>제목</th>
            <th>작성날짜</th>
            <th>아이디</th>
          </tr>
        </thead>
        <tbody>
          {records.map(record => (
            <tr key={record.postId}>
              <td>
                <a href={`/detail/${record.postId}`}>{record.title}</a>
              </td>
              <td>{record.createdDate}</td>
              <td>{record.userId}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Welcome;
