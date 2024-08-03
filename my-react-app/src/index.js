// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css'; // 스타일 파일을 임포트

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
);
