import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function SearchPage() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState('spiderman'); // initial search term
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch movies based on searchTerm
  const fetchMovies = async (searchTerm) => {
    if (!searchTerm.trim()) {
      setMovies([]);
      setError(null);
      return;
    }
    try {
      setLoading(true);
      setError(null);
      const res = await axios.get('https://www.omdbapi.com/', {
        params: {
          apikey: '407f8aed',
          s: searchTerm,
          type: 'movie',
        },
      });
      if (res.data.Response === 'True') {
        setMovies(res.data.Search);
      } else {
        setMovies([]);
        setError(res.data.Error || 'No movies found.');
      }
    } catch (err) {
      setError('Error fetching movies.');
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  // Run initial fetch with default query on mount
  useEffect(() => {
    fetchMovies(query);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchMovies(query);
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Search Movies</h1>

      <form onSubmit={handleSearch} className="mb-6 flex justify-center">
        <input
          type="text"
          placeholder="Enter movie title..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border border-gray-300 text-black rounded px-4 py-2 w-60"
        />
        <button
          type="submit"
          className="ml-3 bg-yellow-400 hover:bg-yellow-600 text-white px-4 py-2 rounded"
        >
          Search
        </button>
      </form>

      {loading && <p className="text-center text-gray-400 mt-10">Loading movies...</p>}
      {error && <p className="text-center text-red-500 mt-10">{error}</p>}

      {!loading && !error && movies.length === 0 && (
        <p className="text-center text-gray-400 mt-10">No movies found.</p>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {movies.map((movie) => (
          <Link
            to={`movies/${movie._id}`}
            className="block text-center no-underline text-white"
          >
            <img
              src={movie.Poster !== 'N/A' ? movie.Poster : '/no-image.png'}
              alt={movie.Title}
              className="w-full h-auto rounded"
            />
            <p className="mt-2 font-semibold">
              {movie.Title} ({movie.Year})
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
