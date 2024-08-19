import { render, screen } from "@testing-library/react"; // react-testing-library의 render와 screen을 가져옴
import App from "./App"; // App 컴포넌트를 임포트

test("renders learn react link", () => {
  render(<App />); // App 컴포넌트를 렌더링
  const linkElement = screen.getByText(/learn react/i); // 텍스트에 'learn react'가 포함된 요소를 찾음
  expect(linkElement).toBeInTheDocument(); // 해당 요소가 문서에 존재하는지 검증
});
