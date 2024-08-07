import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'; // App 컴포넌트 import

ReactDOM.render(
  <React.StrictMode>
    <App /> {/* 전체 앱 렌더링 */}
  </React.StrictMode>,
  document.getElementById('root') // 'root' 엘리먼트에 렌더링
);
