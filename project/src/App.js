// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Welcome from './components/Welcome';
import Detail from './components/Detail';
import Write from './components/Write';
import Login from './components/Login';
import Create from './components/Create';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} /> {/* 루트 경로를 Welcome 컴포넌트로 설정 */}
                <Route path="/login" element={<Login />} />
                <Route path="/create" element={<Create />} />
                <Route path="/welcome" element={<Welcome />} />
                <Route path="/write" element={<Write />} />
                <Route path="/detail/:id" element={<Detail />} />
            </Routes>
        </Router>
    );
};

export default App;
