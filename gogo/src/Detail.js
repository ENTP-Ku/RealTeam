import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function Detail() {
  const { id } = useParams();
  const [record, setRecord] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecord = async () => {
      try {
        const response = await axios.get(`/records/${id}`);
        setRecord(response.data);
      } catch (error) {
        console.error('Error fetching record', error);
      }
    };

    fetchRecord();
  }, [id]);

  if (!record) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{record.title}</h1>
      <p>{record.content}</p>
      <p>{record.createdDate}</p>
      <p>{record.username}</p>
      <button onClick={() => navigate('/welcome')}>Back to List</button>
    </div>
  );
}

export default Detail;
