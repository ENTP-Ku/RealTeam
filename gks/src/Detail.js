import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const Detail = () => {
  const { id } = useParams();
  const [record, setRecord] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (!token) {
      navigate('/');
    } else {
      axios.get(`/api/detail/${id}`, { headers: { Authorization: `Bearer ${token}` } })
        .then(response => setRecord(response.data))
        .catch(error => console.error('Error fetching record:', error));
    }
  }, [id, navigate]);

  const handleDelete = async () => {
    const token = sessionStorage.getItem('token');
    try {
      const response = await axios.delete(`/api/detail/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      if (response.data.deleteSuccess) {
        alert(response.data.deleteSuccess);
        navigate('/welcome');
      } else if (response.data.deleteError) {
        alert(response.data.deleteError);
      }
    } catch (error) {
      console.error('Delete error:', error);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    navigate('/');
  };

  if (!record) return <div>Loading...</div>;

  return (
    <div>
      <h2>Detail</h2>
      <button onClick={() => navigate('/welcome')}>Back to List</button>
      <button onClick={handleLogout}>Logout</button>
      <button onClick={handleDelete}>Delete</button>
      <table>
        <tbody>
          <tr>
            <td>Title</td>
            <td>{record.title}</td>
          </tr>
          <tr>
            <td>Username</td>
            <td>{record.username}</td>
          </tr>
          <tr>
            <td>Date</td>
            <td>{record.date}</td>
          </tr>
          <tr>
            <td>Content</td>
            <td>{record.content}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Detail;
