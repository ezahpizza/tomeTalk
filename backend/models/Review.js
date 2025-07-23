import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  reviewText: {
    type: String,
    required: [true, 'Please provide a review text'],
    trim: true,
    maxlength: [1000, 'Review cannot be more than 1000 characters']
  },
  rating: {
    type: Number,
    required: [true, 'Please provide a rating'],
    min: [1, 'Rating must be at least 1'],
    max: [5, 'Rating cannot be more than 5']
  },
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book',
    required: true
  },
  reviewer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

// one review per user per book
reviewSchema.index({ book: 1, reviewer: 1 }, { unique: true });

// average rating
reviewSchema.statics.calcAverageRating = async function(bookId) {
  const stats = await this.aggregate([
    {
      $match: { book: bookId }
    },
    {
      $group: {
        _id: '$book',
        averageRating: { $avg: '$rating' },
        totalReviews: { $sum: 1 }
      }
    }
  ]);

  try {
    await this.model('Book').findByIdAndUpdate(bookId, {
      averageRating: stats[0]?.averageRating || 0,
      totalReviews: stats[0]?.totalReviews || 0
    });
  } catch (error) {
    console.error('Error updating book stats:', error);
  }
};

// average rating after save
reviewSchema.post('save', function() {
  this.constructor.calcAverageRating(this.book);
});

// average rating after remove/delete
reviewSchema.post('findOneAndDelete', function(doc) {
  if (doc) {
    doc.constructor.calcAverageRating(doc.book);
  }
});

reviewSchema.post('deleteOne', function(doc) {
  if (doc) {
    doc.constructor.calcAverageRating(doc.book);
  }
});

const Review = mongoose.model('Review', reviewSchema);

export default Review;
