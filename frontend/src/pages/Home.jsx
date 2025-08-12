
  import React, { useEffect, useState } from 'react';
  import API from '../services/api';
  import MovieCard from '../components/MovieCard';

  export default function Home() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
      API.get('/movies')
        .then(res => {
          setMovies(res.data);
          setLoading(false);
        })
        .catch(() => {
          setError('Failed to load movies');
          setLoading(false);
        });
    }, []);

    if (loading) return <p className="text-center text-gray-400 mt-10">Loading movies...</p>;
    if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;

    if (movies.length === 0) {
      return <p className="text-center text-gray-400 mt-10">No movies available.</p>;
    }

    return (
      <div className="max-w-7xl mx-auto p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {movies.map((m) => (
            <MovieCard key={m._id} movie={m} />
          ))}
        </div>
        <div className='flex justify-center mt-6'>
          <button className='bg-yellow-300 text-white px-4 py-2 rounded-lg hover:bg-yellow-600'>
            Load More
          </button>
        </div>
      </div>
    );
  }

