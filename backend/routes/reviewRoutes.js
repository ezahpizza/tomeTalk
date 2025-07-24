import express from 'express';
import {
  getReviews,
  createReview,
  updateReview,
  deleteReview,
  getReview,
  getUserReviews
} from '../controllers/reviewController.js';
import { validateReview } from '../middleware/validation.js';
import protect from '../middleware/auth.js';

const router = express.Router();

router.get('/my-reviews', protect, getUserReviews);

router.get('/:bookId', getReviews);

router.post('/:bookId', protect, validateReview, createReview);

router.get('/single/:id', getReview);

router.put('/single/:id', protect, validateReview, updateReview);

router.delete('/single/:id', protect, deleteReview);

export default router;
