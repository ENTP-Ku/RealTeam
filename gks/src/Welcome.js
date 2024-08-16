import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Welcome.css'; // Welcome.css를 임포트합니다.

const Welcome = () => {
  const [records, setRecords] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem('token');    
    if (!token) {
      navigate('/');
    } else {      
      axios.get('/api/records', { headers: { Authorization: `Bearer ${token}` } })      
        .then(response => setRecords(response.data))        
        .catch(error => console.error('Error fetching records:', error));
    }
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="welcome-container">
      <header className="header">
        <h1>Welcome</h1>
        <button onClick={handleLogout} className="logout-button">Logout</button>
      </header>
      <div className="content-container">
        <aside className="ad-left"> {/* 왼쪽 광고 섹션 */}
          <p>Left Ad Section</p>
        </aside>
        <div className="main-content">
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Title</th>
                  <th>Username</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {records.map((record, index) => (
                  <tr key={record.id}>
                    <td>{index + 1}</td>
                    <td><a href={`/detail/${record.id}`}>{record.title}</a></td>
                    <td>{record.username}</td>
                    <td>{record.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="button-container">
            <button onClick={() => navigate('/write')} className="write-button">Write</button>
          </div>
        </div>
        <aside className="ad-right"> {/* 오른쪽 광고 섹션 */}
          <p>Right Ad Section</p>
        </aside>
      </div>
    </div>
  );
};

export default Welcome;
