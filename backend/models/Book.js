import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a book title'],
    trim: true,
    maxlength: [200, 'Title cannot be more than 200 characters']
  },
  author: {
    type: String,
    required: [true, 'Please provide an author name'],
    trim: true,
    maxlength: [100, 'Author name cannot be more than 100 characters']
  },
  genre: {
    type: String,
    required: [true, 'Please provide a genre'],
    trim: true,
    enum: [
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
    ]
  },
  description: {
    type: String,
    trim: true,
    maxlength: [1000, 'Description cannot be more than 1000 characters']
  },
  coverUrl: {
    type: String,
    trim: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  averageRating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  totalReviews: {
    type: Number,
    default: 0,
    min: 0
  }
}, {
  timestamps: true
});

bookSchema.index({ title: 'text', author: 'text', genre: 1 });
bookSchema.index({ createdAt: -1 });
bookSchema.index({ averageRating: -1 });

const Book = mongoose.model('Book', bookSchema);

export default Book;
