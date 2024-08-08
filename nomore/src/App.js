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
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Create />} />
                <Route path="/welcome" element={
                    <ProtectedRoute>
                        <Welcome />
                    </ProtectedRoute>
                } />
                <Route path="/write" element={
                    <ProtectedRoute>
                        <Write />
                    </ProtectedRoute>
                } />
                <Route path="/detail/:id" element={
                    <ProtectedRoute>
                        <Detail />
                    </ProtectedRoute>
                } />
            </Routes>
        </Router>
    );
}

export default App;
