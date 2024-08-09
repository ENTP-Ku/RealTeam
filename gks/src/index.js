import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { AuthProvider } from './AuthContext'; // 인증 상태를 전역적으로 관리

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider> {/* 인증 상태 제공 */}
      <App />
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
