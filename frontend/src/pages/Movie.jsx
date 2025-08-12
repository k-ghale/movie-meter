import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import API from '../services/api';
export default function Movie(){
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [reviews, setReviews] = useState([]);
  useEffect(()=>{
    API.get(`/movies/${id}`).then(r=>setMovie(r.data));
    API.get(`/reviews/${id}`).then(r=>setReviews(r.data));
  }, [id]);
  if(!movie) return <div>Loading...</div>;
  return (
    <div className="max-w-3xl mx-auto bg-gray-800 p-6 rounded">
      <h1 className="text-2xl font-bold">{movie.title} ({movie.year})</h1>
      <p className="mt-2 text-gray-300">{movie.description}</p>
      <div className="mt-4">
        <h2 className="text-xl font-semibold">Reviews</h2>
        {reviews.length === 0 && <p className="text-gray-400">No reviews yet.</p>}
        <ul className="space-y-3 mt-3">
          {reviews.map(r => (
            <li key={r._id} className="bg-gray-900 p-3 rounded">
              <strong>{r.user?.name}</strong> <span className="text-yellow-300">{r.rating}/5</span>
              <p className="text-gray-300">{r.content}</p>
            </li>
          ))}
        </ul>
        <Link to={`/movies/${id}/add-review`} className="inline-block mt-4 bg-red-600 py-2 px-3 rounded">Add Review</Link>
      </div>
    </div>
  );
}
