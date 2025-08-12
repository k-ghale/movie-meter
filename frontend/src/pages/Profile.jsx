import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Profile = () => {
  const [user, setUser] = useState({});
  const [reviews, setReviews] = useState([]);

  const token = localStorage.getItem('token');

  useEffect(() => {
    // Fetch user info
    axios
      .get('http://localhost:5000/api/auth/profile', {
        headers: { Authorization: token },
      })
      .then((res) => setUser(res.data))
      .catch((err) => console.error('User fetch error:', err));

    // Fetch user's reviews
    axios
      .get('http://localhost:5000/api/reviews/user', {
        headers: { Authorization: token },
      })
      .then((res) => setReviews(res.data))
      .catch((err) => console.error('Review fetch error:', err));
  }, [token]);

  return (
    <div style={{ padding: '20px' }}>
      <h2>My Profile</h2>
      <p><strong>Name:</strong> {user?.name}</p>
      <p><strong>Email:</strong> {user?.email}</p>

      <h3>My Reviews</h3>
      {reviews.length === 0 ? (
        <p>No reviews submitted yet.</p>
      ) : (
        reviews.map((review) => (
          <div key={review._id} style={{ marginBottom: '15px', borderBottom: '1px solid #ccc' }}>
            <p><strong>Movie:</strong> {review.movieTitle}</p>
            <p><strong>Rating:</strong> {review.rating}/5</p>
            <p>{review.comment}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default Profile;
