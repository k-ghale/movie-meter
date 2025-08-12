import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Movie from './pages/Movie';
import AddReview from './pages/AddReview';
import Header from './components/Header';
import { setAuthToken } from './services/api';
function App(){
  const [user, setUser] = useState(null);
  useEffect(() => {
    const token = localStorage.getItem('token');
    if(token){ setAuthToken(token); }
  }, []);
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header user={user} setUser={setUser} />
      <main className="p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Register setUser={setUser} />} />
          <Route path="/movies/:id" element={<Movie />} />
          <Route path="/movies/:id/add-review" element={<AddReview />} />
        </Routes>
      </main>
    </div>
  );
}
export default App;
