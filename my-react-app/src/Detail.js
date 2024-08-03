// Detail.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Detail = () => {
  const { id } = useParams();
  const [record, setRecord] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`/api/records/${id}`)
      .then(response => {
        setRecord(response.data);
      })
      .catch(error => {
        console.error('Error fetching record details:', error);
      });
  }, [id]);

  if (!record) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{record.title}</h2>
      <p>By: {record.user.username}</p>
      <p>Date: {new Date(record.createdDate).toLocaleDateString()}</p>
      <p>{record.content}</p>
      <button onClick={() => navigate('/welcome')}>Back to List</button>
    </div>
  );
};

export default Detail;
