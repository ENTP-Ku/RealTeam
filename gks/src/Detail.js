import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const Detail = () => {
  const { id } = useParams(); // 게시물 ID를 가져옴
  const [record, setRecord] = useState(null); // 게시물 데이터 상태
  const [comments, setComments] = useState([]); // 댓글 목록 상태
  const [newComment, setNewComment] = useState(''); // 새로운 댓글 입력 상태
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (!token) {
      navigate('/');
    } else {
      // 게시물 정보를 가져옴
      axios.get(`/api/detail/${id}`, { headers: { Authorization: `Bearer ${token}` } })
        .then(response => setRecord(response.data))
        .catch(error => console.error('Error fetching record:', error));

      // 댓글 목록을 가져옴
      axios.get(`/api/detail/${id}/comments`, { headers: { Authorization: `Bearer ${token}` } })
        .then(response => setComments(response.data))
        .catch(error => console.error('Error fetching comments:', error));
    }
  }, [id, navigate]);

  const handleDelete = async () => {
    const token = sessionStorage.getItem('token');
    try {
      const response = await axios.delete(`/api/detail/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      if (response.data.deleteSuccess) {
        alert(response.data.deleteSuccess);
        navigate('/welcome');
      } else if (response.data.deleteError) {
        alert(response.data.deleteError);
      }
    } catch (error) {
      console.error('Delete error:', error);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    navigate('/');
  };

  const handleCommentSubmit = async () => {
    const token = sessionStorage.getItem('token');
    try {
      const response = await axios.post(`/api/detail/${id}/comments`, 
      { content: newComment }, 
      { headers: { Authorization: `Bearer ${token}` } });

      setComments([...comments, response.data]); // 새로운 댓글을 댓글 목록에 추가
      setNewComment(''); // 입력 필드 초기화
    } catch (error) {
      console.error('Error submitting comment:', error);
    }
  };

  if (!record) return <div>Loading...</div>;

  return (
    <div>
      <h2>Detail</h2>
      <button onClick={() => navigate('/welcome')}>Back to List</button>
      <button onClick={handleLogout}>Logout</button>
      <button onClick={handleDelete}>Delete</button>
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
            <td>{record.content}</td>
          </tr>
        </tbody>
      </table>

      <div>
        <h3>Comments</h3>
        {comments.map(comment => (
          <div key={comment.id}>
            <p>{comment.content}</p>
            <small>by {comment.username}</small>
          </div>
        ))}
      </div>

      <div>
        <h4>Add a Comment</h4>
        <textarea 
          value={newComment} 
          onChange={(e) => setNewComment(e.target.value)} 
          placeholder="Write a comment..." 
        />
        <button onClick={handleCommentSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default Detail;
