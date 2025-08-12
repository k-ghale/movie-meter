const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie');
// list movies
router.get('/', async (req, res) => {
  const movies = await Movie.find().sort({ createdAt: -1 });
  res.json(movies);
});
// get single movie
router.get('/:id', async (req, res) => {
  const movie = await Movie.findById(req.params.id);
  if(!movie) return res.status(404).json({ message: 'Not found' });
  res.json(movie);
});
// create movie (simple, no auth here)
router.post('/', async (req, res) => {
  try {
    const movie = await Movie.create(req.body);
    res.status(201).json(movie);
  } catch(e) {
    res.status(400).json({ message: 'Invalid data' });
  }
});
module.exports = router;
