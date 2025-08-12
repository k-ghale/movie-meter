import React from 'react';
import { Link } from 'react-router-dom';
export default function Header({ user }){
  return (
    <header className="bg-gray-900 border-b border-gray-800 p-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">🎬 Movie Reviewer</Link>
        <nav className="space-x-4">
          {user ? <span>{user.name}</span> : <Link to="/login">Log in</Link>}
        </nav>
      </div>
    </header>
  );
}
