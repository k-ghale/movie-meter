import React, { useState } from 'react';
import API, { setAuthToken } from '../services/api';
import { useNavigate } from 'react-router-dom';
export default function Register({ setUser }){
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const submit = async (e) => {
    e.preventDefault();
    try{
      const { data } = await API.post('/auth/register', { name, email, password });
      localStorage.setItem('token', data.token);
      setAuthToken(data.token);
      setUser(data.user);
      navigate('/');
    } catch(err){
      alert(err.response?.data?.message || 'Registration failed');
    }
  };
  return (
    <div className="max-w-md mx-auto bg-gray-800 p-6 rounded-2xl">
      <h2 className="text-2xl font-bold mb-4">Create account</h2>
      <form onSubmit={submit} className="space-y-4">
        <input value={name} onChange={e=>setName(e.target.value)} placeholder="Name" className="w-full p-2 rounded bg-gray-900" required />
        <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" className="w-full p-2 rounded bg-gray-900" required />
        <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" className="w-full p-2 rounded bg-gray-900" required />
        <button className="w-full bg-red-600 py-2 rounded">Sign up</button>
      </form>
    </div>
  );
}
