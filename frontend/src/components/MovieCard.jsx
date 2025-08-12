import React from 'react';
import { Link } from 'react-router-dom';

export default function MovieCard({ movie }) {
  return (
    <Link
      to={`/movies/${movie._id}`}
      className="block bg-gray-900 rounded-lg overflow-hidden shadow-md transform transition duration-300 hover:scale-105 hover:shadow-xl"
    >
      {movie.posterUrl && (
        <img
          src={movie.posterUrl}
          alt={`${movie.title} Poster`}
          className="w-50 h-56"
        />
      )}
      <div className="p-4">
        <h3 className="text-xl font-bold text-white truncate">{movie.title}</h3>
        <p className="text-sm text-indigo-400 mt-1">{movie.year}</p>
        <p className="mt-3 text-gray-300 text-sm line-clamp-3">
          {movie.description || 'No description available.'}
        </p>
      </div>
    </Link>
  );
}

