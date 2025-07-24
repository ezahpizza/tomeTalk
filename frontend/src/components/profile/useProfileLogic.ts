import { useState } from 'react';
import { toast } from 'sonner';
import { Book, Review } from '@/types';
import { useUpdateBook, useDeleteBook } from '@/hooks/useBooks';
import { useUpdateReview, useDeleteReview } from '@/hooks/useReviews';
import { useAuth } from '@/hooks/useAuth';
import { isBookOwner, isReviewOwner } from '@/utils/userUtils';
import { 
  BookFormData, 
  ReviewFormData, 
  createCleanBookData, 
  initializeBookForm, 
  initializeReviewForm 
} from '@/utils';

export const useProfileLogic = () => {
  const { user } = useAuth();
  
  // Edit states
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [editingReview, setEditingReview] = useState<Review | null>(null);
  
  // Form states
  const [bookForm, setBookForm] = useState<BookFormData>({
    title: '',
    author: '',
    genre: '',
    description: '',
    coverUrl: ''
  });
  
  const [reviewForm, setReviewForm] = useState<ReviewFormData>({
    reviewText: '',
    rating: 0
  });

  // Delete states
  const [deletingBook, setDeletingBook] = useState<{ id: string; title: string } | null>(null);
  const [deletingReview, setDeletingReview] = useState<string | null>(null);

  // Mutations
  const updateBookMutation = useUpdateBook();
  const deleteBookMutation = useDeleteBook();
  const updateReviewMutation = useUpdateReview();
  const deleteReviewMutation = useDeleteReview();

  // Book handlers
  const handleEditBook = (book: Book) => {
    // Ensure user can only edit their own books
    if (!user) {
      toast.error('Please log in to edit books');
      return;
    }
    
    if (!isBookOwner(book, user)) {
      console.log('Ownership check failed:', {
        bookCreatedBy: book.createdBy,
        currentUser: user,
        bookCreatedById: typeof book.createdBy === 'object' ? book.createdBy._id : book.createdBy,
        currentUserId: user._id
      });
      toast.error('You can only edit books you created');
      return;
    }
    
    setEditingBook(book);
    setBookForm(initializeBookForm(book));
  };

  const handleUpdateBook = async () => {
    if (!editingBook) return;

    try {
      const cleanData = createCleanBookData(bookForm);

      await updateBookMutation.mutateAsync({
        id: editingBook._id,
        data: cleanData
      });
      toast.success('Book updated successfully!');
      setEditingBook(null);
    } catch (error) {
      console.error('Update book error:', error);
      toast.error('Failed to update book');
    }
  };

  const handleDeleteBook = async (bookId: string, title: string) => {
    // Additional validation could be added here if needed
    setDeletingBook({ id: bookId, title });
  };

  const confirmDeleteBook = async () => {
    if (!deletingBook) return;

    try {
      await deleteBookMutation.mutateAsync(deletingBook.id);
      toast.success(`"${deletingBook.title}" deleted successfully!`);
      setDeletingBook(null);
    } catch (error) {
      toast.error('Failed to delete book');
    }
  };

  // Review handlers
  const handleEditReview = (review: Review) => {
    // Ensure user can only edit their own reviews
    if (!isReviewOwner(review, user)) {
      toast.error('You can only edit reviews you wrote');
      return;
    }
    
    setEditingReview(review);
    setReviewForm(initializeReviewForm(review));
  };

  const handleUpdateReview = async () => {
    if (!editingReview) return;

    try {
      await updateReviewMutation.mutateAsync({
        reviewId: editingReview._id,
        data: reviewForm
      });
      toast.success('Review updated successfully!');
      setEditingReview(null);
    } catch (error) {
      toast.error('Failed to update review');
    }
  };

  const handleDeleteReview = async (reviewId: string) => {
    setDeletingReview(reviewId);
  };

  const confirmDeleteReview = async () => {
    if (!deletingReview) return;

    try {
      await deleteReviewMutation.mutateAsync(deletingReview);
      toast.success('Review deleted successfully!');
      setDeletingReview(null);
    } catch (error) {
      toast.error('Failed to delete review');
    }
  };

  return {
    // States
    editingBook,
    editingReview,
    bookForm,
    reviewForm,
    deletingBook,
    deletingReview,
    
    // Form setters
    setBookForm,
    setReviewForm,
    
    // Handlers
    handleEditBook,
    handleUpdateBook,
    handleDeleteBook,
    confirmDeleteBook,
    handleEditReview,
    handleUpdateReview,
    handleDeleteReview,
    confirmDeleteReview,
    
    // Close handlers
    closeEditBook: () => setEditingBook(null),
    closeEditReview: () => setEditingReview(null),
    closeDeletingBook: () => setDeletingBook(null),
    closeDeletingReview: () => setDeletingReview(null),
    
    // Loading states
    isUpdatingBook: updateBookMutation.isPending,
    isUpdatingReview: updateReviewMutation.isPending,
  };
};
