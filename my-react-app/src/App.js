// App.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './Login';
import Create from './Create';
import Welcome from './Welcome';
import Wright from './Wright';
import Detail from './Detail';
import PrivateRoute from './PrivateRoute'; // 로그인 검사를 위한 PrivateRoute 컴포넌트

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/create" element={<Create />} />
      <Route
        path="/welcome"
        element={
          <PrivateRoute>
            <Welcome />
          </PrivateRoute>
        }
      />
      <Route
        path="/write"
        element={
          <PrivateRoute>
            <Wright />
          </PrivateRoute>
        }
      />
      <Route
        path="/detail/:id"
        element={
          <PrivateRoute>
            <Detail />
          </PrivateRoute>
        }
      />
      <Route path="*" element={<Login />} /> {/* 404 페이지, 기본적으로 로그인 페이지로 리다이렉트 */}
    </Routes>
  );
};

export default App;
