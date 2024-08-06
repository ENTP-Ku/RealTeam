import { useState, useEffect } from 'react';

// 사용자 인증 상태를 관리하는 훅
export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  useEffect(() => {
    // 로그인 상태 확인을 위한 API 호출
    fetch('/api/auth/check')
      .then(response => {
        setIsAuthenticated(response.status === 200);
      });
  }, []);

  return { isAuthenticated };
}
