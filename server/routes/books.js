const express = require('express');
const Book = require('../models/Book');
const Review = require('../models/Review');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/', auth, async (req, res) => {
  try {
    const { title, author, genre, publishedYear, description } = req.body;

    const book = new Book({
      title,
      author,
      genre,
      publishedYear,
      description,
      averageRating: 0,
      reviewCount: 0
    });

    await book.save();
    res.status(201).json(book);
  } catch (err) {
    console.error('Book creation failed:', err);
    res.status(500).json({ error: 'Failed to create book' });
  }
});


router.get('/', async (req, res) => {
  try {
    const {
      genre,
      author,
      page = 1,
      limit = 5,
      sortBy = 'createdAt'
    } = req.query;

    const filter = {};
    if (genre) filter.genre = genre;
    if (author) filter.author = author;

    const books = await Book.find(filter)
      .sort(sortBy === 'rating' ? {} : { [sortBy]: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));


    const booksWithRatings = await Promise.all(
      books.map(async (book) => {
        const reviews = await Review.find({ book: book._id });
        const avgRating =
          reviews.reduce((sum, r) => sum + r.rating, 0) / (reviews.length || 1);

        return {
          ...book.toObject(),
          averageRating: parseFloat(avgRating.toFixed(1)),
          reviewCount: reviews.length
        };
      })
    );

    if (sortBy === 'rating') {
      booksWithRatings.sort((a, b) => b.averageRating - a.averageRating);
    }

    res.json(booksWithRatings);
  } catch (err) {
    console.error('Failed to fetch books:', err);
    res.status(500).json({ error: 'Failed to fetch books' });
  }
});


router.get('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).send('Book not found');

    const reviews = await Review.find({ book: book._id });
    const averageRating =
      reviews.reduce((sum, r) => sum + r.rating, 0) / (reviews.length || 1);

    const enrichedBook = {
      ...book.toObject(),
      averageRating: parseFloat(averageRating.toFixed(1)),
      reviewCount: reviews.length,
    };

    res.json(enrichedBook);
  } catch (err) {
    console.error('Failed to fetch book:', err);
    res.status(500).json({ error: 'Failed to fetch book detail' });
  }
});


module.exports = router;
