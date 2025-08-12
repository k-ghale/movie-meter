import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../services/api';

export default function AddReview() {
  const { id } = useParams();
  const [rating, setRating] = useState(5);
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await API.post(`/reviews/${id}`, { rating, content });
      navigate(`/movies/${id}`);
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to submit review');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 bg-gradient-to-tr from-gray-900 via-gray-800 to-gray-900 p-8 rounded-xl shadow-xl border border-gray-700">
      <h2 className="text-3xl font-extrabold text-yellow-400 mb-8 text-center select-none">
        Write a Review
      </h2>
      <form onSubmit={submit} className="space-y-6">
        <div>
          <label
            htmlFor="rating"
            className="block mb-2 text-yellow-300 font-semibold tracking-wide"
          >
            Rating
          </label>
          <select
            id="rating"
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className="w-full bg-gray-700 text-yellow-200 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            disabled={loading}
          >
            {[5, 4, 3, 2, 1].map((n) => (
              <option key={n} value={n}>
                {n} Star{n > 1 ? 's' : ''}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="content"
            className="block mb-2 text-yellow-300 font-semibold tracking-wide"
          >
            Review
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={6}
            placeholder="Share your thoughts about the movie..."
            className="w-full bg-gray-700 text-yellow-200 rounded-md p-3 resize-none focus:outline-none focus:ring-2 focus:ring-yellow-400"
            disabled={loading}
          />
        </div>

        <button
          type="submit"
          disabled={loading || !content.trim()}
          className={`w-full py-3 rounded-lg font-semibold text-gray-900 transition-colors duration-300 ${
            loading || !content.trim()
              ? 'bg-yellow-300 cursor-not-allowed'
              : 'bg-yellow-400 hover:bg-yellow-500'
          }`}
        >
          {loading ? 'Submitting...' : 'Submit Review'}
        </button>
      </form>
    </div>
  );
}
