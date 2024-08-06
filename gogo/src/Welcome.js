import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Welcome() {
  const [records, setRecords] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const response = await axios.get('/records');
        setRecords(response.data);
      } catch (error) {
        console.error('Error fetching records', error);
      }
    };

    fetchRecords();
  }, []);

  const handleLogout = () => {
    // Clear session or token if used
    navigate('/login');
  };

  const handleWrite = () => {
    navigate('/write');
  };

  return (
    <div>
      <h1>Welcome</h1>
      <button onClick={handleLogout}>Logout</button>
      <button onClick={handleWrite}>Write</button>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Date</th>
            <th>Username</th>
          </tr>
        </thead>
        <tbody>
          {records.map(record => (
            <tr key={record.id}>
              <td>
                <a href={`/detail/${record.id}`}>{record.title}</a>
              </td>
              <td>{record.createdDate}</td>
              <td>{record.username}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Welcome;
