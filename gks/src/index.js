import React from 'react';
import ReactDOM from 'react-dom/client'; // React 18에서는 'react-dom/client'를 사용합니다.
import App from './App';

// 루트 요소를 생성합니다.
const root = ReactDOM.createRoot(document.getElementById('root'));

// 앱을 루트에 렌더링합니다.
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
