import express from 'express';
import {
  getBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook,
  getGenres
} from '../controllers/bookController.js';
import { validateBook } from '../middleware/validation.js';
import protect from '../middleware/auth.js';

const router = express.Router();

// @route GET /api/books/genres
router.get('/genres', getGenres);

// @route GET /api/books
// @route POST /api/books
router.route('/')
  .get(getBooks)
  .post(protect, validateBook, createBook);

// @route GET /api/books/:id
// @route PUT /api/books/:id
// @route DELETE /api/books/:id
router.route('/:id')
  .get(getBook)
  .put(protect, validateBook, updateBook)
  .delete(protect, deleteBook);

export default router;
