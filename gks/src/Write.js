import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Write = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!title) {
      alert('제목을 입력해 주세요');
      return;
    }
    if (!content) {
      alert('내용을 입력해 주세요');
      return;
    }
    const token = sessionStorage.getItem('token');
    try {
      await axios.post('/api/write', { title, content }, { headers: { Authorization: `Bearer ${token}` } });
      navigate('/welcome');
    } catch (error) {
      console.error('Write error:', error);
    }
  };

  return (
    <div>
      <h2>Write</h2>
      <input type="text" placeholder="Title" onChange={(e) => setTitle(e.target.value)} />
      <textarea placeholder="Content" onChange={(e) => setContent(e.target.value)} />
      <button onClick={handleSubmit}>Submit</button>
      <button onClick={() => navigate('/welcome')}>Back to List</button>
    </div>
  );
};

export default Write;
