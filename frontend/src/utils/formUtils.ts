import { Book, Review } from '@/types';

export interface BookFormData {
  title: string;
  author: string;
  genre: string;
  description: string;
  coverUrl: string;
}

export interface ReviewFormData {
  reviewText: string;
  rating: number;
}

export const createCleanBookData = (formData: BookFormData) => {
  const updateData = {
    title: formData.title.trim(),
    author: formData.author.trim(),
    genre: formData.genre,
    description: formData.description.trim(),
    coverUrl: formData.coverUrl.trim() || undefined,
  };

  return Object.fromEntries(
    Object.entries(updateData).filter(([_, value]) => value !== undefined && value !== '')
  );
};

export const initializeBookForm = (book: Book): BookFormData => ({
  title: book.title,
  author: book.author,
  genre: book.genre,
  description: book.description || '',
  coverUrl: book.coverUrl || ''
});

export const initializeReviewForm = (review: Review): ReviewFormData => ({
  reviewText: review.reviewText,
  rating: review.rating
});
