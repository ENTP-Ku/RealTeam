import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Create from './components/Create';
import Welcome from './components/Welcome';
import Write from './components/Write';
import Detail from './components/Detail';
import { useAuth } from './context/AuthContext';

const App = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/create" element={<Create />} />
        <Route path="/welcome" element={isAuthenticated ? <Welcome /> : <Login />} />
        <Route path="/write" element={isAuthenticated ? <Write /> : <Login />} />
        <Route path="/detail" element={isAuthenticated ? <Detail /> : <Login />} />
        <Route path="/" element={<Login />} /> {/* 기본 경로 추가 */}
      </Routes>
    </Router>
  );
};

export default App;
