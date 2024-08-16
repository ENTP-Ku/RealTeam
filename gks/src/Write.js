import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Write.css'; // Write.css를 임포트합니다.

const Write = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (!token) {
      navigate('/');
    }
  }, [navigate]);

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
      console.log("성공!")
    } catch (error) {
      console.error('Write error:', error);
      console.log("또 실패")
    }
  };
      
  return (
    <div className="write-container">
      <div className="form-container">
        <h2>Write</h2>
        <input type="text" placeholder="Title" onChange={(e) => setTitle(e.target.value)} />
        <textarea placeholder="Content" onChange={(e) => setContent(e.target.value)} />
        <button onClick={handleSubmit} className="submit-button">Submit</button>
        <button onClick={() => navigate('/welcome')} className="back-button">Back to List</button>
      </div>
    </div>
  );
};

export default Write;
