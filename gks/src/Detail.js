import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './Detail.css'; // Detail.css를 임포트합니다.

const Detail = () => {
  const { id } = useParams();
  const [record, setRecord] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingContent, setEditingContent] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (!token) {
      navigate('/');
    } else {
      axios.get(`/api/detail/${id}`, { headers: { Authorization: `Bearer ${token}` } })
        .then(response => setRecord(response.data))
        .catch(error => console.error('Error fetching record:', error));

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

      setComments([...comments, response.data]);
      setNewComment('');
    } catch (error) {
      console.error('Error submitting comment:', error);
    }
  };

  const handleCommentEdit = async (commentId) => {
    const token = sessionStorage.getItem('token');
    try {
      const response = await axios.put(
        `/api/detail/${id}/comments/${commentId}`,
        { content: editingContent },
        { headers: { Authorization: `Bearer ${token}` } }
      );
  
      setComments(comments.map(comment =>
        comment.id === commentId ? { ...comment, content: response.data.content } : comment
      ));
      setEditingCommentId(null);
      setEditingContent('');
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        alert(error.response.data.message); // 서버에서 반환한 메시지를 alert로 표시
      } else {
        console.error('Error editing comment:', error);
        alert('댓글 수정 중 오류가 발생했습니다.'); // 기본 오류 메시지
      }
    }
  };
  
  const handleCommentDelete = async (commentId) => {
    const token = sessionStorage.getItem('token');
    try {
      await axios.delete(`/api/detail/${id}/comments/${commentId}`, { headers: { Authorization: `Bearer ${token}` } });
      setComments(comments.filter(comment => comment.id !== commentId));
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  const startEditing = (comment) => {
    setEditingCommentId(comment.id);
    setEditingContent(comment.content);
  };

  if (!record) return <div>Loading...</div>;

  return (
    <div>
      <h2>Detail</h2>
      <button onClick={() => navigate('/welcome')} className="back-button">Back to List</button>
      <button onClick={handleLogout} className="logout-button">Logout</button>
      <button onClick={handleDelete} className="delete-button">Delete</button>
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
        {comments.map(comment => (
          <div key={comment.id}>
            {editingCommentId === comment.id ? (
              <div>
                <textarea
                  value={editingContent}
                  onChange={(e) => setEditingContent(e.target.value)}
                />
                <button onClick={() => handleCommentEdit(comment.id)} className="save-button">Save</button>
                <button onClick={() => setEditingCommentId(null)} className="cancel-button">Cancel</button>
              </div>
            ) : (
              <div>
                <p className="pre-wrap-text">{comment.content}</p>
                <small>by {comment.username}</small>
                <button onClick={() => startEditing(comment)} className="edit-button">Edit</button>
                <button onClick={() => handleCommentDelete(comment.id)} className="delete-button">Delete</button>
              </div>
            )}
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
        <button onClick={handleCommentSubmit} className="submit-button">Submit</button>
      </div>
    </div>
  );
};

export default Detail;
