import Book from '../models/Book.js';
import { validationResult } from 'express-validator';

// get all books
const getBooks = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    let filter = {};
    
    if (req.query.genre && req.query.genre !== 'all') {
      filter.genre = req.query.genre;
    }
    
    if (req.query.author) {
      filter.author = { $regex: req.query.author, $options: 'i' };
    }

    if (req.query.search) {
      filter.$or = [
        { title: { $regex: req.query.search, $options: 'i' } },
        { author: { $regex: req.query.search, $options: 'i' } }
      ];
    }

    let sort = {};
    switch (req.query.sortBy) {
      case 'rating':
        sort = { averageRating: -1 };
        break;
      case 'title':
        sort = { title: 1 };
        break;
      case 'author':
        sort = { author: 1 };
        break;
      default:
        sort = { createdAt: -1 };
    }

    const books = await Book.find(filter)
      .populate('createdBy', 'name')
      .sort(sort)
      .limit(limit)
      .skip(skip);

    const total = await Book.countDocuments(filter);

    res.json({
      success: true,
      data: {
        books,
        pagination: {
          current: page,
          pages: Math.ceil(total / limit),
          total,
          limit
        }
      }
    });
  } catch (error) {
    console.error('Get books error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching books'
    });
  }
};

// book by ID
const getBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id)
      .populate('createdBy', 'name email');

    if (!book) {
      return res.status(404).json({
        success: false,
        message: 'Book not found'
      });
    }

    res.json({
      success: true,
      data: book
    });
  } catch (error) {
    console.error('Get book error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching book'
    });
  }
};

const createBook = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { title, author, genre, description, coverUrl } = req.body;

    const book = await Book.create({
      title,
      author,
      genre,
      description,
      coverUrl,
      createdBy: req.user._id
    });

    await book.populate('createdBy', 'name');

    res.status(201).json({
      success: true,
      data: book
    });
  } catch (error) {
    console.error('Create book error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error creating book'
    });
  }
};

// update  book
const updateBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: 'Book not found'
      });
    }

    if (book.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this book'
      });
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('createdBy', 'name');

    res.json({
      success: true,
      data: updatedBook
    });
  } catch (error) {
    console.error('Update book error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error updating book'
    });
  }
};

// delete book
const deleteBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: 'Book not found'
      });
    }

    // Check if user is the book creator
    if (book.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this book'
      });
    }

    await Book.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Book deleted successfully'
    });
  } catch (error) {
    console.error('Delete book error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error deleting book'
    });
  }
};

// get genres
const getGenres = async (req, res) => {
  try {
    const genres = [
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
    ];

    res.json({
      success: true,
      data: genres
    });
  } catch (error) {
    console.error('Get genres error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching genres'
    });
  }
};

export {
  getBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook,
  getGenres
};
