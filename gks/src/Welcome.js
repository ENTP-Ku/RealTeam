import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Welcome.css"; // Welcome.css를 임포트합니다.

const Welcome = () => {
  // 상태와 훅 선언
  const [records, setRecords] = useState([]);
  const navigate = useNavigate(); // 페이지 이동을 위한 훅

  // 컴포넌트가 마운트되면 데이터를 불러옴
  useEffect(() => {
    const token = sessionStorage.getItem("token"); // 세션에서 토큰 가져오기
    if (!token) {
      navigate("/"); // 토큰이 없으면 로그인 페이지로 리다이렉트
    } else {
      axios
        .get("/api/records", { headers: { Authorization: `Bearer ${token}` } })
        .then((response) => setRecords(response.data)) // 응답 데이터를 상태에 저장
        .catch((error) => console.error("Error fetching records:", error));
    }
  }, [navigate]); // navigate가 변경될 때마다 호출됨

  // 로그아웃 함수
  const handleLogout = () => {
    sessionStorage.removeItem("token"); // 세션에서 토큰 삭제
    navigate("/"); // 로그인 페이지로 리다이렉트
  };

  return (
    <div className="welcome-container">
      <header className="header">
        <h1>Welcome</h1>
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </header>
      <div className="content-container">
        <aside className="ad-left">
          {" "}
          {/* 왼쪽 광고 섹션 */}
          <p>Left Ad Section</p>
        </aside>
        <div className="main-content">
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Title</th>
                  <th>Username</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {records.map((record, index) => (
                  <tr key={record.id}>
                    <td>{index + 1}</td>
                    <td>
                      <a href={`/detail/${record.id}`}>{record.title}</a>{" "}
                      {/* 상세 페이지 링크 */}
                    </td>
                    <td>{record.username}</td>
                    <td>{record.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="button-container">
            <button onClick={() => navigate("/write")} className="write-button">
              Write
            </button>
          </div>
        </div>
        <aside className="ad-right">
          {" "}
          {/* 오른쪽 광고 섹션 */}
          <p>Right Ad Section</p>
        </aside>
      </div>
    </div>
  );
};

export default Welcome;
