import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; // React Router import
import Login from './Login'; // 로그인 컴포넌트 import
import Create from './Create'; // 회원가입 컴포넌트 import
import Welcome from './Welcome'; // 메인 게시판 컴포넌트 import
import Write from './Write'; // 글쓰기 컴포넌트 import
import Detail from './Detail'; // 상세 페이지 컴포넌트 import

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate replace to="/login" />} /> {/* 기본 경로 설정 */}
        <Route path="/login" element={<Login />} /> {/* 로그인 페이지 경로 설정 */}
        <Route path="/create" element={<Create />} /> {/* 회원가입 페이지 경로 설정 */}
        <Route path="/welcome" element={<Welcome />} /> {/* 메인 게시판 페이지 경로 설정 */}
        <Route path="/write" element={<Write />} /> {/* 글쓰기 페이지 경로 설정 */}
        <Route path="/detail/:id" element={<Detail />} /> {/* 상세 페이지 경로 설정 */}
      </Routes>
    </Router>
  );
}

export default App; // App 컴포넌트 export
