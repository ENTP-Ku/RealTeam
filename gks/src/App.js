import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import Create from './Create';
import Welcome from './Welcome';
import Write from './Write';
import Detail from './Detail';
import ProtectedRoute from './ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} /> {/* 기본 페이지로 Login.js 설정 */}
        <Route path="/create" element={<Create />} /> {/* 회원가입 페이지 */}
        <Route path="/welcome" element={<ProtectedRoute><Welcome /></ProtectedRoute>} /> {/* 보호된 라우트 */}
        <Route path="/write" element={<ProtectedRoute><Write /></ProtectedRoute>} /> {/* 보호된 라우트 */}
        <Route path="/detail/:id" element={<ProtectedRoute><Detail /></ProtectedRoute>} /> {/* 보호된 라우트 */}
      </Routes>
    </Router>
  );
}

export default App;
