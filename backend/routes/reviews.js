const express = require('express');
const router = express.Router();
const Review = require('../models/Review');
const Movie = require('../models/Movie');
const auth = require('../middleware/auth');
// add review
router.post('/:movieId', auth, async (req, res) => {
  const { rating, content } = req.body;
  const movie = await Movie.findById(req.params.movieId);
  if(!movie) return res.status(404).json({ message: 'Movie not found' });
  const review = await Review.create({ user: req.user._id, movie: movie._id, rating, content });
  movie.reviewCount += 1;
  movie.averageRating = ((movie.averageRating * (movie.reviewCount - 1)) + rating) / movie.reviewCount;
  await movie.save();
  res.status(201).json(review);
});
// get reviews for a movie
router.get('/:movieId', async (req, res) => {
  const reviews = await Review.find({ movie: req.params.movieId }).populate('user', 'name');
  res.json(reviews);
});
module.exports = router;
