import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserCircleIcon } from '@heroicons/react/24/solid';
import SearchPage from '../pages/Search';

export default function Header({ user, onLogout }) {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  
  const handleLogout = () => {
    if (onLogout) {
      onLogout();       // Call parent logout to clear user state
    }
    navigate('/login');  // Redirect to login page
  };


  return (
    <header className="backdrop-blur-md bg-black/50 shadow-lg border-b border-gray-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        {/* Logo / Title */}
        <Link
          to="/"
          className="text-3xl font-extrabold text-yellow-400 tracking-wide hover:text-yellow-300 transition-colors duration-300 select-none"
        >
          🎥 Movie Meter
        </Link>

        <Link
  to="/search"
  className="
  bg-yellow-400 text-black px-4 py-2 rounded-full font-semibold shadow-md hover:bg-yellow-300 transition duration-300 select-none flex items-center space-x-2"
  
>
  Search
</Link>


        {/* Navigation */}
        <nav className="flex items-center space-x-6 text-gray-200">
          {user ? (
            <>
              <div className="flex items-center space-x-3 cursor-pointer group relative">
                <UserCircleIcon className="w-7 h-7 text-yellow-400 group-hover:text-yellow-300 transition-colors duration-300" />
                <span className="font-semibold select-none">{user.name}</span>
              </div>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full font-semibold shadow-md transition duration-300 select-none"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="bg-yellow-400 text-black px-5 py-2 rounded-full font-semibold shadow-md hover:bg-yellow-300 transition duration-300 select-none"
            >
              Log in
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
