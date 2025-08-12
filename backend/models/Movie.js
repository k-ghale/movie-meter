const mongoose = require('mongoose');
const MovieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  year: { type: Number },
  posterUrl: { type: String },
  averageRating: { type: Number, default: 0 },
  reviewCount: { type: Number, default: 0 }
}, { timestamps: true });
module.exports = mongoose.model('Movie', MovieSchema);
