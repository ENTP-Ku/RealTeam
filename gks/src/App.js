import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import Create from './Create';
import Welcome from './Welcome';
import Write from './Write';
import Detail from './Detail';
import { AuthProvider } from './auth';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/create" element={<Create />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/write" element={<Write />} />
          <Route path="/detail/:id" element={<Detail />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
