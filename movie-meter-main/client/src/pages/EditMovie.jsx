import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditMovie = () => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:5000/api/movies/${id}`)
      .then(res => {
        setTitle(res.data.title);
        setDescription(res.data.description);
      })
      .catch(err => console.error(err));
  }, [id]);

  const handleUpdate = e => {
    e.preventDefault();
    axios.put(`http://localhost:5000/api/movies/${id}`, { title, description })
      .then(() => navigate('/'))
      .catch(err => console.error(err));
  };

  return (
    <form onSubmit={handleUpdate}>
      <h1>Edit Movie</h1>
      <input type="text" value={title} onChange={e => setTitle(e.target.value)} required />
      <textarea value={description} onChange={e => setDescription(e.target.value)} required />
      <button type="submit">Update</button>
    </form>
  );
};

export default EditMovie;
