import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../utils/api';
import { useNavigate } from 'react-router-dom';

export default function PostCard({ post }) {
  const { user } = useContext(AuthContext);
  const nav = useNavigate();

  const deletePost = async () => {
    if (!window.confirm('Delete this post?')) return; // FIXED HERE
    try {
      await api.delete(`/posts/${post._id}`);
      window.location.reload();
    } catch (err) {
      alert('Delete failed');
    }
  };

  const isOwner = user && (user.id === post.author?._id || user.id === post.author);

  return (
    <div className="post-card">
      <h3>{post.title}</h3>
      <p>{post.content}</p>
      <small>By {post.author?.username || 'Unknown'} • {new Date(post.createdAt).toLocaleString()}</small>
      {isOwner && (
        <div>
          <button onClick={() => nav(`/editor?edit=${post._id}`)}>Edit</button>
          <button onClick={deletePost}>Delete</button>
        </div>
      )}
    </div>
  );
}

