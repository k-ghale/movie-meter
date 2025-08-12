import React, { useState } from 'react';
import API, { setAuthToken } from '../services/api';
import { useNavigate } from 'react-router-dom';
export default function Login({ setUser }){
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const submit = async (e) => {
    e.preventDefault();
    try{
      const { data } = await API.post('/auth/login', { email, password });
      localStorage.setItem('token', data.token);
      setAuthToken(data.token);
      setUser(data.user);
      navigate('/');
    } catch(err){
      alert(err.response?.data?.message || 'Login failed');
    }
  };
  return (
    <div className="max-w-md mx-auto bg-gray-800 p-6 rounded-2xl">
      <h2 className="text-2xl font-bold mb-4">Log in</h2>
      <form onSubmit={submit} className="space-y-4">
        <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" className="w-full p-2 rounded bg-gray-900" required />
        <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" className="w-full p-2 rounded bg-gray-900" required />
        <button className="w-full bg-red-600 py-2 rounded hover:bg-red-700 transition duration-300">Log in</button>
      </form>

      <a href="/register" className="text-blue-400 hover:underline">Create an account</a>
    </div>
  );
}
