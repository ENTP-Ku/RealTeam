// Wright.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Wright = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const handleSubmit = () => {
    axios.post('/api/records', { title, content })
      .then(response => {
        navigate('/welcome'); // 성공적으로 작성 후 Welcome 페이지로 이동
      })
      .catch(error => {
        console.error('Error creating record:', error);
      });
  };

  return (
    <div>
      <h2>Write a Post</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default Wright;
