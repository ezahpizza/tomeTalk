import express from 'express';
import { signup, login, getMe } from '../controllers/authController.js';
import { validateSignup, validateLogin } from '../middleware/validation.js';
import protect from '../middleware/auth.js';

const router = express.Router();

// @route POST /api/auth/signup
router.post('/signup', validateSignup, signup);

// @route POST /api/auth/login
router.post('/login', validateLogin, login);

// @route GET /api/auth/me
router.get('/me', protect, getMe);

export default router;
