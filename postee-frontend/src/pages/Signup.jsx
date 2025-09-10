import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Signup(){
  const [form, setForm] = useState({ username:'', email:'', password:'' });
  const { signup } = useContext(AuthContext);
  const nav = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup(form);
      nav('/');
    } catch (err) {
      alert(err?.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Username" value={form.username} onChange={e => setForm({...form, username:e.target.value})} />
      <input placeholder="Email" value={form.email} onChange={e => setForm({...form, email:e.target.value})} />
      <input placeholder="Password" type="password" value={form.password} onChange={e => setForm({...form, password:e.target.value})} />
      <button type="submit">Sign up</button>
    </form>
  );
}
