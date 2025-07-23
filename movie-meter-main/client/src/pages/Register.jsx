import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/auth/register', form)
      .then(() => alert('Registered successfully!'))
      .catch(() => alert('Registration failed.'));
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <h2 className="text-xl font-semibold mb-4">Register</h2>
      <input type="text" placeholder="Name" value={form.name}
        onChange={e => setForm({ ...form, name: e.target.value })} className="block mb-2" required />
      <input type="email" placeholder="Email" value={form.email}
        onChange={e => setForm({ ...form, email: e.target.value })} className="block mb-2" required />
      <input type="password" placeholder="Password" value={form.password}
        onChange={e => setForm({ ...form, password: e.target.value })} className="block mb-2" required />
      <button type="submit" className="bg-green-600 text-white px-4 py-2">Sign Up</button>
    </form>
  );
};

export default Register;
