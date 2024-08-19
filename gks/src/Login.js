import React, { useState, useEffect } from "react"; // React와 훅을 임포트
import { useNavigate } from "react-router-dom"; // useNavigate 훅을 임포트
import axios from "axios"; // axios를 임포트
import "./Login.css"; // 스타일 파일을 임포트

const Login = () => {
  const [username, setUsername] = useState(""); // 사용자 이름 상태
  const [password, setPassword] = useState(""); // 비밀번호 상태
  const navigate = useNavigate(); // 페이지 이동을 위한 훅

  useEffect(() => {
    const token = sessionStorage.getItem("token"); // 세션 저장소에서 토큰 가져오기
    if (token) {
      navigate("/welcome"); // 토큰이 존재하면 welcome 페이지로 리다이렉트
    }
  }, [navigate]);

  const handleLogin = async () => {
    try {
      // 로그인 요청
      const response = await axios.post("/api/login", { username, password });
      if (response.data.token) {
        // 성공적으로 로그인하면 토큰 저장 및 welcome 페이지로 이동
        sessionStorage.setItem("token", response.data.token);
        navigate("/welcome");
      } else if (response.data.loginError) {
        // 로그인 오류 메시지 표시
        alert(response.data.loginError);
      }
    } catch (error) {
      // 로그인 과정에서 오류가 발생한 경우
      console.error("Login error:", error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Login</h2>
        <input
          type="text"
          placeholder="Username" // 사용자 이름 입력 필드
          onChange={(e) => setUsername(e.target.value)} // 값 변경 시 상태 업데이트
        />
        <input
          type="password"
          placeholder="Password" // 비밀번호 입력 필드
          onChange={(e) => setPassword(e.target.value)} // 값 변경 시 상태 업데이트
        />
        <button onClick={handleLogin}>Login</button> {/* 로그인 버튼 */}
        <button onClick={() => navigate("/create")}>Sign Up</button>{" "}
        {/* 회원가입 페이지로 이동하는 버튼 */}
      </div>
    </div>
  );
};

export default Login;
