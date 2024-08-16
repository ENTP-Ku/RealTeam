import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const Detail = () => {
  const { id } = useParams(); // URL에서 게시물 ID를 가져옴
  const [record, setRecord] = useState(null); // 게시물 데이터 상태 관리
  const [comments, setComments] = useState([]); // 댓글 목록 상태 관리
  const [newComment, setNewComment] = useState(''); // 새로운 댓글 입력 상태 관리
  const [editingCommentId, setEditingCommentId] = useState(null); // 현재 수정 중인 댓글의 ID 상태 관리
  const [editingContent, setEditingContent] = useState(''); // 수정 중인 댓글의 내용 상태 관리
  const navigate = useNavigate(); // 페이지 이동을 위한 navigate 함수

  useEffect(() => {
    const token = sessionStorage.getItem('token'); // 세션 스토리지에서 JWT 토큰을 가져옴
    if (!token) {
      navigate('/'); // 토큰이 없으면 로그인 페이지로 이동
    } else {
      // 게시물 정보를 가져옴
      axios.get(`/api/detail/${id}`, { headers: { Authorization: `Bearer ${token}` } })
        .then(response => setRecord(response.data)) // 가져온 데이터를 record 상태에 저장
        .catch(error => console.error('Error fetching record:', error)); // 에러 발생 시 콘솔에 출력

      // 댓글 목록을 가져옴
      axios.get(`/api/detail/${id}/comments`, { headers: { Authorization: `Bearer ${token}` } })
        .then(response => setComments(response.data)) // 가져온 댓글 데이터를 comments 상태에 저장
        .catch(error => console.error('Error fetching comments:', error)); // 에러 발생 시 콘솔에 출력
    }
  }, [id, navigate]); // id나 navigate가 변경될 때마다 이 효과를 실행

  const handleDelete = async () => {
    const token = sessionStorage.getItem('token'); // 세션 스토리지에서 JWT 토큰을 가져옴
    try {
      const response = await axios.delete(`/api/detail/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      if (response.data.deleteSuccess) {
        alert(response.data.deleteSuccess); // 성공 메시지를 alert로 출력
        navigate('/welcome'); // 성공 시 Welcome 페이지로 이동
      } else if (response.data.deleteError) {
        alert(response.data.deleteError); // 실패 메시지를 alert로 출력
      }
    } catch (error) {
      console.error('Delete error:', error); // 에러 발생 시 콘솔에 출력
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('token'); // 세션 스토리지에서 JWT 토큰 삭제
    navigate('/'); // 로그인 페이지로 이동
  };

  const handleCommentSubmit = async () => {
    const token = sessionStorage.getItem('token'); // 세션 스토리지에서 JWT 토큰을 가져옴
    try {
      const response = await axios.post(`/api/detail/${id}/comments`, 
      { content: newComment }, // 새로운 댓글 내용을 서버에 전송
      { headers: { Authorization: `Bearer ${token}` } });

      setComments([...comments, response.data]); // 새로운 댓글을 기존 댓글 목록에 추가
      setNewComment(''); // 입력 필드를 초기화
    } catch (error) {
      console.error('Error submitting comment:', error); // 에러 발생 시 콘솔에 출력
    }
  };

  const handleCommentEdit = async (commentId) => {
    const token = sessionStorage.getItem('token'); // 세션 스토리지에서 JWT 토큰을 가져옴
    try {
      const response = await axios.put(
        `/api/detail/${id}/comments/${commentId}`,
        { content: editingContent }, // 수정된 댓글 내용을 서버에 전송
        { headers: { Authorization: `Bearer ${token}` } }
      );
  
      setComments(comments.map(comment =>
        comment.id === commentId ? { ...comment, content: response.data.content } : comment
      )); // 수정된 댓글 내용을 상태에 반영
      setEditingCommentId(null); // 수정 모드를 종료
      setEditingContent(''); // 입력 필드를 초기화
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        alert(error.response.data.message); // 서버에서 반환한 메시지 표시
      } else {
        console.error('Error editing comment:', error); // 에러 발생 시 콘솔에 출력
        alert('댓글 수정 중 오류가 발생했습니다.'); // 기본 오류 메시지
      }
    }
  };
  
  const handleCommentDelete = async (commentId) => {
    const token = sessionStorage.getItem('token'); // 세션 스토리지에서 JWT 토큰을 가져옴
    try {
      await axios.delete(`/api/detail/${id}/comments/${commentId}`, { headers: { Authorization: `Bearer ${token}` } });
      setComments(comments.filter(comment => comment.id !== commentId)); // 삭제된 댓글을 목록에서 제거
    } catch (error) {
      console.error('Error deleting comment:', error); // 에러 발생 시 콘솔에 출력
    }
  };

  const startEditing = (comment) => {
    setEditingCommentId(comment.id); // 수정 중인 댓글의 ID를 상태에 저장
    setEditingContent(comment.content); // 수정 중인 댓글의 내용을 상태에 저장
  };

  if (!record) return <div>Loading...</div>; // 게시물 데이터가 아직 로딩 중일 경우

  return (
    <div>
      <h2>Detail</h2>
      <button onClick={() => navigate('/welcome')}>Back to List</button> {/* 글목록으로 돌아가기 */}
      <button onClick={handleLogout}>Logout</button> {/* 로그아웃 버튼 */}
      <button onClick={handleDelete}>Delete</button> {/* 글 삭제 버튼 */}
      <table>
        <tbody>
          <tr>
            <td>Title</td>
            <td>{record.title}</td> {/* 제목 표시 */}
          </tr>
          <tr>
            <td>Username</td>
            <td>{record.username}</td> {/* 사용자명 표시 */}
          </tr>
          <tr>
            <td>Date</td>
            <td>{record.date}</td> {/* 작성 날짜 표시 */}
          </tr>
          <tr>
            <td>Content</td>
            <td>{record.content}</td> {/* 내용 표시 */}
          </tr>
        </tbody>
      </table>

      <div>
        <h3>Comments</h3>
        {comments.map(comment => (
          <div key={comment.id}>
            {editingCommentId === comment.id ? (
              <div>
                <textarea 
                  value={editingContent}
                  onChange={(e) => setEditingContent(e.target.value)} // 수정 중인 댓글 내용을 입력 필드에 반영
                />
                <button onClick={() => handleCommentEdit(comment.id)}>Save</button> {/* 댓글 수정 저장 버튼 */}
                <button onClick={() => setEditingCommentId(null)}>Cancel</button> {/* 댓글 수정 취소 버튼 */}
              </div>
            ) : (
              <div>
                <p>{comment.content}</p> {/* 댓글 내용 표시 */}
                <small>by {comment.username}</small> {/* 댓글 작성자 표시 */}
                <button onClick={() => startEditing(comment)}>Edit</button> {/* 댓글 수정 버튼 */}
                <button onClick={() => handleCommentDelete(comment.id)}>Delete</button> {/* 댓글 삭제 버튼 */}
              </div>
            )}
          </div>
        ))}
      </div>

      <div>
        <h4>Add a Comment</h4>
        <textarea 
          value={newComment} 
          onChange={(e) => setNewComment(e.target.value)} // 새로운 댓글 입력 필드에 반영
          placeholder="Write a comment..." 
        />
        <button onClick={handleCommentSubmit}>Submit</button> {/* 댓글 제출 버튼 */}
      </div>
    </div>
  );
};

export default Detail;
