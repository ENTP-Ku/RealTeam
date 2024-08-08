import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { isAuthenticated } from './auth'; // 인증 유틸리티 함수

const ProtectedRoute = ({ element }) => {
    const location = useLocation(); // 현재 위치를 가져오기 위한 훅

    return isAuthenticated() ? (
        element // 인증된 경우 전달된 컴포넌트를 렌더링
    ) : (
        <Navigate to="/login" state={{ from: location }} /> // 인증되지 않은 경우 로그인 페이지로 리디렉션
    );
};

export default ProtectedRoute;
