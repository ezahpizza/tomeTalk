import { BookDetailsCard, ReviewForm, ReviewsList, LoadingState } from '@/components/books';
import { useBookDetail } from '@/hooks/useBookDetail';

const BookDetailPage = () => {
  const {
    id,
    isAuthenticated,
    shouldRedirect,
    isLoading,
    hasError,
    bookData,
    reviewsData,
    handleBackClick,
  } = useBookDetail();

  if (shouldRedirect) {
    return null;
  }

  if (isLoading) {
    return <LoadingState type="loading" />;
  }

  if (hasError || !bookData) {
    return (
      <LoadingState 
        type="not-found" 
        title="Book Not Found"
        onBackClick={handleBackClick}
      />
    );
  }

  return (
    <div className="select-none container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto animate-fade-in-up">
        <BookDetailsCard book={bookData} />
        
        <ReviewForm 
          bookId={id}
          isAuthenticated={isAuthenticated}
        />
        
        <ReviewsList reviews={reviewsData} />
      </div>
    </div>
  );
};

export default BookDetailPage;