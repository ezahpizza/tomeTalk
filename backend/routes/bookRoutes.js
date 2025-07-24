import express from 'express';
import {
  getBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook,
  getGenres,
  getUserBooks
} from '../controllers/bookController.js';
import { validateBook } from '../middleware/validation.js';
import protect from '../middleware/auth.js';

const router = express.Router();

router.get('/genres', getGenres);

router.get('/my-books', protect, getUserBooks);

router.route('/')
  .get(getBooks)
  .post(protect, validateBook, createBook);

router.route('/:id')
  .get(getBook)
  .put(protect, validateBook, updateBook)
  .delete(protect, deleteBook);

export default router;
