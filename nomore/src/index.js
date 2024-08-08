import React from 'react';
import ReactDOM from 'react-dom/client'; // React 18에서 변경된 import
import App from './App';

// createRoot를 사용하여 앱을 렌더링합니다.
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
