import { Book, Review, User } from '@/types';

export const isBookOwner = (book: Book, user: User | null): boolean => {
  if (!user || !book) return false;
  
  if (typeof book.createdBy === 'object' && book.createdBy !== null) {
    return book.createdBy._id === user._id;
  }
  
  if (typeof book.createdBy === 'string') {
    return book.createdBy === user._id;
  }
  
  return false;
};

export const isReviewOwner = (review: Review, user: User | null): boolean => {
  if (!user) return false;
  
  if (typeof review.reviewer === 'object') {
    return review.reviewer._id === user._id;
  }
  
  return review.reviewer === user._id;
};

export const getBookTitleFromReview = (book: Review['book']): string => {
  if (typeof book === 'object' && book !== null) {
    return (book as Book).title;
  }
  return 'Unknown Book';
};

export const getUserName = (user: { _id: string; name: string } | string): string => {
  if (typeof user === 'object') {
    return user.name;
  }
  return 'Unknown User';
};
