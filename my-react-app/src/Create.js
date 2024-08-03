// Create.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Create = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [uniqueId, setUniqueId] = useState('');
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    axios.post('/api/users', { username, password, uniqueId })
      .then(response => {
        alert('Welcome! Please log in.');
        navigate('/login');
      })
      .catch(error => {
        console.error('Error creating user:', error);
      });
  };

  return (
    <div>
      <h2>Create Account</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <input
        type="text"
        placeholder="Unique ID"
        value={uniqueId}
        onChange={(e) => setUniqueId(e.target.value)}
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default Create;
