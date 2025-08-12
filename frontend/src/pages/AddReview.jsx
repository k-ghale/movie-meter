import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../services/api';
export default function AddReview(){
  const { id } = useParams();
  const [rating, setRating] = useState(5);
  const [content, setContent] = useState('');
  const navigate = useNavigate();
  const submit = async (e) => {
    e.preventDefault();
    try{
      await API.post(`/reviews/${id}`, { rating, content });
      navigate(`/movies/${id}`);
    } catch(err){
      alert(err.response?.data?.message || 'Failed');
    }
  };
  return (
    <div className="max-w-md mx-auto bg-gray-800 p-6 rounded">
      <h2 className="text-2xl mb-4">Write a review</h2>
      <form onSubmit={submit} className="space-y-3">
        <label>Rating</label>
        <select value={rating} onChange={e=>setRating(Number(e.target.value))} className="w-full p-2 rounded">
          {[5,4,3,2,1].map(n=> <option key={n} value={n}>{n}</option>)}
        </select>
        <textarea value={content} onChange={e=>setContent(e.target.value)} rows={5} className="w-full p-2 rounded" placeholder="What did you think?" />
        <button className="w-full bg-red-600 py-2 rounded">Submit</button>
      </form>
    </div>
  );
}
