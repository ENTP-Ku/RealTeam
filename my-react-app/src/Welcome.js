// Welcome.js
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Welcome = () => {
  const [records, setRecords] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/api/records')
      .then(response => {
        setRecords(response.data);
      })
      .catch(error => {
        console.error('Error fetching records:', error);
      });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken'); // 인증 토큰 삭제
    navigate('/login'); // 로그인 페이지로 이동
  };

  return (
    <div>
      <h1>Welcome to the Board</h1>
      <button onClick={handleLogout}>Logout</button>
      <button onClick={() => navigate('/write')}>Write</button>

      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Date</th>
            <th>Author</th>
          </tr>
        </thead>
        <tbody>
          {records.map(record => (
            <tr key={record.id}>
              <td>
                <Link to={`/detail/${record.id}`}>{record.title}</Link>
              </td>
              <td>{new Date(record.createdDate).toLocaleDateString()}</td>
              <td>{record.user.username}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Welcome;
