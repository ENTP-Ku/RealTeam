import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // useNavigate를 import합니다.

function Welcome() {
    const navigate = useNavigate(); // useNavigate 훅을 사용하여 navigate 함수를 가져옵니다.

    const handleLogout = () => {
        // 로그아웃 로직 구현 (예: 토큰 삭제)
        navigate('/login'); // 로그인 페이지로 이동합니다.
    };

    return (
        <div>
            <h1>Welcome to the Board</h1>
            <table>
                <thead>
                    <tr>
                        <th>글번호</th>
                        <th>제목</th>
                        <th>작성날짜</th>
                        <th>아이디</th>
                    </tr>
                </thead>
                <tbody>
                    {/* 이 부분에 Record 데이터를 반복하여 렌더링합니다. */}
                </tbody>
            </table>
            <button onClick={handleLogout}>로그아웃</button>
            <Link to="/wright">글쓰기</Link> {/* 글쓰기 페이지로 이동 */}
        </div>
    );
}

export default Welcome;
