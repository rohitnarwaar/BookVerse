const express = require('express');
const Review = require('../models/Review');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/:bookId', auth, async (req, res) => {
  const { review_text, rating } = req.body;
  const review = new Review({
    review_text,
    rating,
    book: req.params.bookId,
    reviewer: req.user.id
  });
  await review.save();
  res.status(201).json(review);
});

router.get('/:bookId', async (req, res) => {
  const reviews = await Review.find({ book: req.params.bookId }).populate('reviewer', 'username');
  res.json(reviews);
});

module.exports = router;
