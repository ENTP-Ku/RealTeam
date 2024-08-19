import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Write.css"; // Write.css를 임포트합니다.

const Write = () => {
  const [title, setTitle] = useState(""); // 제목 상태
  const [content, setContent] = useState(""); // 내용 상태
  const navigate = useNavigate(); // 페이지 이동을 위한 navigate 훅

  // 컴포넌트가 마운트되었을 때 실행
  useEffect(() => {
    const token = sessionStorage.getItem("token"); // 세션 스토리지에서 토큰 가져오기
    if (!token) {
      navigate("/"); // 토큰이 없으면 로그인 페이지로 이동
    }
  }, [navigate]);

  // 제출 버튼 클릭 시 호출되는 함수
  const handleSubmit = async () => {
    if (!title) {
      alert("제목을 입력해 주세요"); // 제목이 비어있으면 경고
      return;
    }
    if (!content) {
      alert("내용을 입력해 주세요"); // 내용이 비어있으면 경고
      return;
    }

    const token = sessionStorage.getItem("token"); // 세션 스토리지에서 토큰 가져오기

    try {
      await axios.post(
        "/api/write",
        { title, content }, // POST 요청 데이터
        { headers: { Authorization: `Bearer ${token}` } } // 인증 헤더
      );
      navigate("/welcome"); // 성공 시 환영 페이지로 이동
      console.log("성공!"); // 성공 로그
    } catch (error) {
      console.error("Write error:", error); // 오류 로그
      console.log("또 실패"); // 실패 로그
    }
  };

  return (
    <div className="write-container">
      <div className="form-container">
        <h2>Write</h2>
        <input
          type="text"
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)} // 제목 입력 처리
        />
        <textarea
          placeholder="Content"
          onChange={(e) => setContent(e.target.value)} // 내용 입력 처리
        />
        <button onClick={handleSubmit} className="submit-button">
          Submit
        </button>
        <button onClick={() => navigate("/welcome")} className="back-button">
          Back to List
        </button>
      </div>
    </div>
  );
};

export default Write;
