import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Create = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (password !== confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }
    try {
      const response = await axios.post('/api/create', { username, password, employeeId });
      if (response.data.createSuccess) {
        alert(response.data.createSuccess);
        navigate('/');
      } else if (response.data.createError) {
        alert(response.data.createError);
      }
    } catch (error) {
      console.error('Create error:', error);
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <input type="password" placeholder="Confirm Password" onChange={(e) => setConfirmPassword(e.target.value)} />
      <input type="text" placeholder="Employee ID" onChange={(e) => setEmployeeId(e.target.value)} />
      <button onClick={handleSubmit}>Submit</button>
      <button onClick={() => navigate('/')}>Home</button>
    </div>
  );
};

export default Create;
