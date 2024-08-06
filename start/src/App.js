import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Login';
import Create from './Create';
import Welcome from './Welcome';
import Write from './Write';
import Detail from './Detail';
import { useAuth } from './auth';  // 사용자 인증 상태를 확인하는 커스텀 훅

function App() {
  const { isAuthenticated } = useAuth();  // 로그인 상태 확인

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create" element={<Create />} />
        <Route path="/welcome" element={isAuthenticated ? <Welcome /> : <Navigate to="/login" />} />
        <Route path="/write" element={isAuthenticated ? <Write /> : <Navigate to="/login" />} />
        <Route path="/detail/:postId" element={isAuthenticated ? <Detail /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
