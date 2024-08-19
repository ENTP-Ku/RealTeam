import React from "react"; // React를 임포트
import ReactDOM from "react-dom/client"; // ReactDOM의 client 모듈을 임포트
import { BrowserRouter } from "react-router-dom"; // BrowserRouter를 임포트
import App from "./App"; // App 컴포넌트를 임포트
import "./index.css"; // 전역 스타일 시트를 임포트

const root = ReactDOM.createRoot(document.getElementById("root"));
// 'root' ID를 가진 DOM 요소를 기준으로 React의 루트 생성

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      {/* BrowserRouter로 감싸진 App 컴포넌트 렌더링 */}
    </BrowserRouter>
  </React.StrictMode>
);
