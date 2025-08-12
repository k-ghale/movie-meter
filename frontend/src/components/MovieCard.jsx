import React from 'react';
import { Link } from 'react-router-dom';

export default function MovieCard({ movie }) {
  return (
    <Link
      to={`/movies/${movie._id}`}
      className="group bg-gray-899 rounded-xl overflow-hidden shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl max-w-xs mx-auto"
    >
      {/* Movie Poster */}
      {movie.posterUrl && (
        <img
          src={movie.posterUrl}
          alt={`${movie.title} Poster`}
          className="w-64 h-96 mx-auto object-cover transition-transform duration-300 group-hover:scale-105 flex justify-center items-center"
        />
      )}

      {/* Movie Info */}
      <div className="p-3">
        <h4 className="text-lg font-bold text-white truncate text-center group-hover:text-yellow-300 transition">
          {movie.title}
        </h4>
        <p className="text-gray-400 text-center">{movie.year}</p>
        <p className="mt-2 text-sm text-gray-300 h-16 overflow-hidden text-center">
          {movie.description || 'No description available.'}
        </p>
      </div>
    </Link>
  );
}

