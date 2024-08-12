import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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
    <div>
      <h2>Welcome</h2>
      <button onClick={() => navigate('/write')}>Write</button>
      <button onClick={handleLogout}>Logout</button>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Username</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {records.map(record => (
            <tr key={record.id}>
              <td><a href={`/detail/${record.id}`}>{record.title}</a></td>
              <td>{record.username}</td>
              <td>{record.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Welcome;
