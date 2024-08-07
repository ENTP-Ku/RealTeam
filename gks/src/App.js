import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import Create from './Create';
import Welcome from './Welcome';
import Write from './Write';
import Detail from './Detail';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/create" element={<Create />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/write" element={<Write />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/" element={<Login />} /> {/* 기본 경로 설정 */}
      </Routes>
    </Router>
  );
}

export default App;
