import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import { useNavigate, useLocation } from 'react-router-dom';

export default function PostEditor(){
  const nav = useNavigate();
  const q = new URLSearchParams(useLocation().search);
  const editId = q.get('edit');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (editId) {
      api.get(`/posts/${editId}`).then(r => {
        setTitle(r.data.data.title);
        setContent(r.data.data.content);
      });
    }
  }, [editId]);

  const submit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await api.put(`/posts/${editId}`, { title, content });
      } else {
        await api.post('/posts', { title, content });
      }
      nav('/');
    } catch (err) {
      alert('Save failed');
    }
  };

  return (
    <form onSubmit={submit}>
      <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" />
      <textarea value={content} onChange={e => setContent(e.target.value)} placeholder="Write something..." />
      <button type="submit">Save</button>
    </form>
  );
}
