import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'; // 스타일 시트 추가

// ReactDOM의 root 요소를 얻어와서 App 컴포넌트를 렌더링
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
