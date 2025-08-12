require('dotenv').config();
const connectDB = require('../config/db');
const Movie = require('../models/Movie');
const movies = [
  { title: 'The Shawshank Redemption', year: 1994, description: 'Two imprisoned men bond over a number of years.', posterUrl: '' },
  { title: 'The Godfather', year: 1972, description: 'The aging patriarch of an organized crime dynasty transfers control.', posterUrl: '' },
  { title: 'Inception', year: 2010, description: 'A thief who steals corporate secrets through use of dream-sharing technology.', posterUrl: '' }
];
const seed = async () => {
  await connectDB(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/moviereviewer');
  await Movie.deleteMany();
  await Movie.insertMany(movies);
  console.log('Seeded movies'); process.exit();
};
seed().catch(err => { console.error(err); process.exit(1); });
