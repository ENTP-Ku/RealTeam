import React, { useState } from 'react';
import Login from './Login'; // 로그인 컴포넌트 가져오기
import axios from 'axios';

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // JWT 토큰 저장 여부에 따라 인증 상태 변경
    const checkAuth = () => {
        const token = localStorage.getItem('token');
        if (token) {
            axios.get('http://localhost:8080/protected', {
                headers: { Authorization: `Bearer ${token}` }
            })
            .then(() => setIsAuthenticated(true))
            .catch(() => setIsAuthenticated(false));
        }
    };

    // 초기 인증 상태 확인
    React.useEffect(() => {
        checkAuth();
    }, []);

    return (
        <div>
            {isAuthenticated ? (
                <div>
                    <h1>Welcome!</h1>
                    {/* 인증된 사용자를 위한 보호된 페이지 */}
                </div>
            ) : (
                <Login /> // 로그인 컴포넌트를 보여줍니다
            )}
        </div>
    );
};

export default App;
