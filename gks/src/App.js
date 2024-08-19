import React from "react";
import { Routes, Route } from "react-router-dom"; // react-router-dom에서 Routes와 Route를 가져옴
import Login from "./Login"; // Login 컴포넌트 임포트
import Create from "./Create"; // Create 컴포넌트 임포트
import Welcome from "./Welcome"; // Welcome 컴포넌트 임포트
import Write from "./Write"; // Write 컴포넌트 임포트
import Detail from "./Detail"; // Detail 컴포넌트 임포트

function App() {
  return (
    <div className="App">
      {" "}
      {/* App 컴포넌트의 최상위 div */}
      <Routes>
        {" "}
        {/* URL 경로에 따라 컴포넌트를 매칭 */}
        <Route path="/" element={<Login />} /> {/* 기본 경로: Login 컴포넌트 */}
        <Route path="/login" element={<Login />} />{" "}
        {/* /login 경로: Login 컴포넌트 */}
        <Route path="/create" element={<Create />} />{" "}
        {/* /create 경로: Create 컴포넌트 */}
        <Route path="/welcome" element={<Welcome />} />{" "}
        {/* /welcome 경로: Welcome 컴포넌트 */}
        <Route path="/write" element={<Write />} />{" "}
        {/* /write 경로: Write 컴포넌트 */}
        <Route path="/detail/:id" element={<Detail />} />{" "}
        {/* /detail/:id 경로: Detail 컴포넌트, id는 동적 파라미터 */}
      </Routes>
    </div>
  );
}

export default App; // App 컴포넌트를 기본 내보내기로 설정
