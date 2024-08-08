import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import Create from './Create';
import Welcome from './Welcome';
import Write from './Write';
import Detail from './Detail';
import { AuthProvider } from './auth';
import ProtectedRoute from './ProtectedRoute'; // 추가

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/create" element={<Create />} />
          <Route path="/welcome" element={<ProtectedRoute element={<Welcome />} />} /> {/* 보호된 라우트 */}
          <Route path="/write" element={<ProtectedRoute element={<Write />} />} /> {/* 보호된 라우트 */}
          <Route path="/detail/:id" element={<ProtectedRoute element={<Detail />} />} /> {/* 보호된 라우트 */}
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
