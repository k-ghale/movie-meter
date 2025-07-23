import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import MovieDetail from './pages/MovieDetail'
import AddMovie from './pages/AddMovie'
import EditMovie from './pages/EditMovie'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import Search from './components/Search'

const App = () => {
  return (
    <Router>
      <div className='wrapper p-10 text-center'>
        <header>
          <h1 className='text-4xl font-bold'>
            Rate <span className='text-gradient'>Movies</span> As You Feel
          </h1>
          <h2 className='text-lg text-gray-500 mt-2'>
            Your go-to place for discovering, rating, and sharing your favorite movies.
          </h2>
        </header>

        {/* Search bar shown on all pages */}
        <div className='mt-10'>
          <Search />
        </div>

        {/* Page Routes */}
        <div className='mt-10'>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/movie/:id" element={<MovieDetail />} />
            <Route path="/add" element={<AddMovie />} />
            <Route path="/edit/:id" element={<EditMovie />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App
