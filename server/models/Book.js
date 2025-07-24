const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  genre: { type: String, required: true },
  publishedYear: { type: Number, required: true }, 
  description: { type: String, default: 'No description available.' }, 
  averageRating: { type: Number, default: 0 }, 
  reviewCount: { type: Number, default: 0 },   
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Book', bookSchema);
