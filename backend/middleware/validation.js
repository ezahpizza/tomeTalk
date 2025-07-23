import { body } from 'express-validator';

export const validateSignup = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
];

export const validateLogin = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
];

export const validateBook = [
  body('title')
    .trim()
    .isLength({ min: 1, max: 200 })
    .withMessage('Title must be between 1 and 200 characters'),
  body('author')
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Author name must be between 1 and 100 characters'),
  body('genre')
    .isIn([
      'Fiction',
      'Non-Fiction',
      'Mystery',
      'Romance',
      'Science Fiction',
      'Fantasy',
      'Thriller',
      'Historical Fiction',
      'Biography',
      'Memoir',
      'Self-Help',
      'Psychology',
      'Literary Fiction',
      'Contemporary Fiction',
      'Psychological Thriller',
      'Young Adult',
      'Children',
      'Poetry',
      'Essay',
      'Other'
    ])
    .withMessage('Please select a valid genre'),
  body('description')
    .optional()
    .isLength({ max: 1000 })
    .withMessage('Description cannot be more than 1000 characters'),
  body('coverUrl')
    .optional()
    .isURL()
    .withMessage('Cover URL must be a valid URL')
];

export const validateReview = [
  body('reviewText')
    .trim()
    .isLength({ min: 10, max: 1000 })
    .withMessage('Review text must be between 10 and 1000 characters'),
  body('rating')
    .isInt({ min: 1, max: 5 })
    .withMessage('Rating must be a number between 1 and 5')
];
