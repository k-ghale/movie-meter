import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Movie from './pages/Movie';
import Header from './components/Header';
import API, { setAuthToken} from './services/api';
import AddReview from './pages/AddReview';
import SearchPage from './pages/Search';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setAuthToken(token);
      API.get('/auth/me')
        .then(res => setUser(res.data))
        .catch(() => {
          setUser(null);
          setAuthToken(null);
          localStorage.removeItem('token');
        });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setAuthToken(null);
    setUser(null);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header user={user} onLogout={handleLogout} />
      <main className="p-4 max-w-7xl mx-auto">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Register setUser={setUser} />} />
          <Route path="/movies/:id" element={<Movie />} />
          <Route path="/movies/:id/add-review" element={<AddReview />} />
          <Route path="/search/movies/:id/add-review" element={<AddReview />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
