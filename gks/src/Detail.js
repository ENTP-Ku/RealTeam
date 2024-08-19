import React, { useEffect, useState } from "react"; // React, useEffect, useState를 임포트
import { useNavigate, useParams } from "react-router-dom"; // useNavigate와 useParams를 임포트
import axios from "axios"; // axios를 임포트
import "./Detail.css"; // 스타일 시트 임포트

const Detail = () => {
  const { id } = useParams(); // URL 파라미터에서 id를 가져옴
  const [record, setRecord] = useState(null); // 레코드 상태
  const [comments, setComments] = useState([]); // 댓글 상태
  const [newComment, setNewComment] = useState(""); // 새 댓글 상태
  const [editingCommentId, setEditingCommentId] = useState(null); // 편집 중인 댓글 ID
  const [editingContent, setEditingContent] = useState(""); // 편집 중인 댓글 내용
  const navigate = useNavigate(); // 페이지 이동을 위한 navigate 함수

  useEffect(() => {
    const token = sessionStorage.getItem("token"); // 세션에서 토큰 가져오기
    if (!token) {
      navigate("/"); // 토큰이 없으면 홈으로 이동
    } else {
      // 레코드와 댓글 데이터를 가져오기
      axios
        .get(`/api/detail/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => setRecord(response.data)) // 레코드 데이터 설정
        .catch((error) => console.error("Error fetching record:", error));

      axios
        .get(`/api/detail/${id}/comments`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => setComments(response.data)) // 댓글 데이터 설정
        .catch((error) => console.error("Error fetching comments:", error));
    }
  }, [id, navigate]);

  const handleDelete = async () => {
    const token = sessionStorage.getItem("token"); // 세션에서 토큰 가져오기
    try {
      const response = await axios.delete(`/api/detail/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.message === "삭제가 완료되었습니다.") {
        alert("삭제가 완료되었습니다."); // 성공 메시지 표시
        navigate("/welcome"); // 리스트로 이동
      } else {
        console.error("Unexpected response:", response);
      }
    } catch (error) {
      if (error.response && error.response.status === 403) {
        alert("삭제 권한이 없습니다."); // 권한 오류 처리
      } else {
        console.error("Delete error:", error); // 기타 오류 처리
      }
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("token"); // 세션에서 토큰 제거
    navigate("/"); // 홈으로 이동
  };

  const handleCommentSubmit = async () => {
    const token = sessionStorage.getItem("token"); // 세션에서 토큰 가져오기

    if (newComment.trim() === "") {
      alert("댓글을 입력해 주세요"); // 댓글이 비어있을 경우 경고
      return;
    }

    try {
      const response = await axios.post(
        `/api/detail/${id}/comments`,
        { content: newComment },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setComments([...comments, response.data]); // 댓글 추가
      setNewComment(""); // 입력 필드 초기화
    } catch (error) {
      console.error("Error submitting comment:", error); // 오류 처리
    }
  };

  const handleCommentEdit = async (commentId) => {
    const token = sessionStorage.getItem("token"); // 세션에서 토큰 가져오기
    try {
      const response = await axios.put(
        `/api/detail/${id}/comments/${commentId}`,
        { content: editingContent },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setComments(
        comments.map((comment) =>
          comment.id === commentId
            ? { ...comment, content: response.data.content } // 댓글 내용 업데이트
            : comment
        )
      );
      setEditingCommentId(null); // 편집 모드 종료
      setEditingContent(""); // 편집 내용 초기화
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        alert(error.response.data.message); // 서버 오류 메시지 표시
      } else {
        console.error("Error editing comment:", error); // 기타 오류 처리
        alert("댓글 수정 중 오류가 발생했습니다."); // 오류 메시지 표시
      }
    }
  };

  const handleCommentDelete = async (commentId) => {
    const token = sessionStorage.getItem("token"); // 세션에서 토큰 가져오기
    try {
      const response = await axios.delete(
        `/api/detail/${id}/comments/${commentId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.message === "댓글이 삭제되었습니다.") {
        setComments(comments.filter((comment) => comment.id !== commentId)); // 댓글 삭제
      } else {
        console.error("Unexpected response:", response);
      }
    } catch (error) {
      if (error.response && error.response.status === 403) {
        alert("삭제 권한이 없습니다."); // 권한 오류 처리
      } else {
        console.error("Error deleting comment:", error); // 기타 오류 처리
      }
    }
  };

  const startEditing = (comment) => {
    setEditingCommentId(comment.id); // 편집할 댓글 ID 설정
    setEditingContent(comment.content); // 편집할 댓글 내용 설정
  };

  if (!record) return <div>Loading...</div>; // 레코드가 로딩 중일 때

  return (
    <div>
      <h2>Detail</h2>
      <button onClick={() => navigate("/welcome")} className="back-button">
        Back to List
      </button>
      <button onClick={handleLogout} className="logout-button">
        Logout
      </button>
      <button onClick={handleDelete} className="delete-button">
        Delete
      </button>
      <table>
        <tbody>
          <tr>
            <td>Title</td>
            <td>{record.title}</td>
          </tr>
          <tr>
            <td>Username</td>
            <td>{record.username}</td>
          </tr>
          <tr>
            <td>Date</td>
            <td>{record.date}</td>
          </tr>
          <tr>
            <td>Content</td>
            <td className="pre-wrap-text">{record.content}</td>
          </tr>
        </tbody>
      </table>

      <div>
        <h3>Comments</h3>
        {comments.map((comment) => (
          <div key={comment.id}>
            {editingCommentId === comment.id ? (
              <div>
                <textarea
                  value={editingContent}
                  onChange={(e) => setEditingContent(e.target.value)} // 편집 내용 업데이트
                />
                <button
                  onClick={() => handleCommentEdit(comment.id)}
                  className="save-button"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditingCommentId(null)}
                  className="cancel-button"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div>
                <p className="pre-wrap-text">{comment.content}</p>
                <small>by {comment.username}</small>
                <button
                  onClick={() => startEditing(comment)}
                  className="edit-button"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleCommentDelete(comment.id)}
                  className="delete-button"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      <div>
        <h4>Add a Comment</h4>
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)} // 새 댓글 내용 업데이트
          placeholder="Write a comment..."
        />
        <button onClick={handleCommentSubmit} className="submit-button">
          Submit
        </button>
      </div>
    </div>
  );
};

export default Detail; // Detail 컴포넌트를 기본 내보내기로 설정
