import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from './AuthContext';

function Welcome() {
  const [records, setRecords] = useState([]); // 게시글 목록 상태 관리
  const { auth, logout } = useContext(AuthContext); // 인증 및 로그아웃 관리
  const navigate = useNavigate(); // 페이지 이동을 위한 훅

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/record/list', {
          headers: { Authorization: `Bearer ${auth}` } // 인증 토큰 포함
        });
        setRecords(response.data); // 가져온 데이터 설정
      } catch (error) {
        alert('로그인 해주세요'); // 로그인되지 않은 경우 알림
        navigate('/'); // 로그인 페이지로 이동
      }
    };
    fetchRecords();
  }, [auth, navigate]);

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
              <td>
                <a href={`/detail/${record.id}`}>{record.title}</a>
              </td>
              <td>{record.createdDate}</td>
              <td>{record.username}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={logout}>로그아웃</button> {/* 로그아웃 버튼 */}
      <button onClick={() => navigate('/write')}>글쓰기</button> {/* 글쓰기 페이지로 이동 */}
    </div>
  );
}

export default Welcome;
