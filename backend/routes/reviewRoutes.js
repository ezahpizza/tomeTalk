import express from 'express';
import {
  getReviews,
  createReview,
  updateReview,
  deleteReview,
  getReview
} from '../controllers/reviewController.js';
import { validateReview } from '../middleware/validation.js';
import protect from '../middleware/auth.js';

const router = express.Router();

// @route GET /api/reviews/:bookId
// @desc  Get all reviews for a specific book
// @access Public
router.get('/:bookId', getReviews);

// @route POST /api/reviews/:bookId
// @desc  Create a new review for a book
// @access Private
router.post('/:bookId', protect, validateReview, createReview);

// @route GET /api/reviews/single/:id
// @desc  Get a single review by ID
// @access Public
router.get('/single/:id', getReview);

// @route PUT /api/reviews/single/:id
// @desc  Update a review
// @access Private (only review author)
router.put('/single/:id', protect, validateReview, updateReview);

// @route DELETE /api/reviews/single/:id
// @desc  Delete a review
// @access Private (only review author)
router.delete('/single/:id', protect, deleteReview);

export default router;
