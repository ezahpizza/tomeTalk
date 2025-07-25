import { useMemo } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useUserBooks } from '@/hooks/useBooks';
import { useUserReviews } from '@/hooks/useReviews';
import { useGenres } from '@/hooks/useBooks';
import {useProfileLogic} from '@/hooks/useProfileLogic';
import { BentoGrid, BentoGridItem } from '@/components/ui/bento-grid';
import { 
  EditBookDialog,
  EditReviewDialog,
  DeleteBookDialog,
  DeleteReviewDialog,
  Rotatingtext,
  getProfileItems
} from '@/components/profile';

const ProfilePage = () => {
  const { user } = useAuth();
  const { data: userBooksData, isLoading: booksLoading } = useUserBooks({ limit: 50 });
  const { data: userReviewsData, isLoading: reviewsLoading } = useUserReviews({ limit: 50 });
  const { data: genresData } = useGenres();

  const {
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
    closeEditBook,
    closeEditReview,
    closeDeletingBook,
    closeDeletingReview,
    
    // Loading states
    isUpdatingBook,
    isUpdatingReview,
  } = useProfileLogic();

  const userBooks = useMemo(() => userBooksData?.data?.books || [], [userBooksData?.data?.books]);
  const userReviews = useMemo(() => userReviewsData?.data?.reviews || [], [userReviewsData?.data?.reviews]);
  const genres = genresData?.data || [];

  const bentoItems = getProfileItems({
    user,
    userBooks,
    userReviews,
    booksLoading,
    reviewsLoading,
    onEditBook: handleEditBook,
    onDeleteBook: handleDeleteBook,
    onEditReview: handleEditReview,
    onDeleteReview: handleDeleteReview,
  });

  return (
    <div className="select-none container mx-auto px-4 py-8 overflow-hidden">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-heading font-bold text-white mb-2">
          My Profile
        </h1>
        <p className="text-charmPink">
          Manage your books, reviews, and account information
        </p>
      </div>

      <BentoGrid className="max-w-6xl mx-auto md:auto-rows-[28rem]">
        {bentoItems.map((item, i) => (
          <BentoGridItem
            key={i}
            title={item.title}
            description={item.description}
            header={item.header}
            className={item.className}
            icon={item.icon}
          />
        ))}
        <div className='md:col-span-2'>
          <Rotatingtext/>
        </div>
      </BentoGrid>

      {/* Edit Book Dialog */}
      <EditBookDialog
        book={editingBook}
        isOpen={!!editingBook}
        onClose={closeEditBook}
        formData={bookForm}
        onFormChange={setBookForm}
        onSubmit={handleUpdateBook}
        isLoading={isUpdatingBook}
        genres={genres}
      />

      {/* Edit Review Dialog */}
      <EditReviewDialog
        review={editingReview}
        isOpen={!!editingReview}
        onClose={closeEditReview}
        formData={reviewForm}
        onFormChange={setReviewForm}
        onSubmit={handleUpdateReview}
        isLoading={isUpdatingReview}
      />

      {/* Delete Book Dialog */}
      <DeleteBookDialog
        isOpen={!!deletingBook}
        onClose={closeDeletingBook}
        onConfirm={confirmDeleteBook}
        bookTitle={deletingBook?.title || ''}
      />

      {/* Delete Review Dialog */}
      <DeleteReviewDialog
        isOpen={!!deletingReview}
        onClose={closeDeletingReview}
        onConfirm={confirmDeleteReview}
      />
    </div>
  );
};

export default ProfilePage;
