import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useBook } from '@/hooks/useBooks';
import { useReviews } from '@/hooks/useReviews';

export const useBookDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const { data: book, isLoading: bookLoading, error: bookError } = useBook(id!);
  const { data: reviews, isLoading: reviewsLoading } = useReviews(id!);

  const handleBackClick = () => {
    navigate('/');
  };

  const shouldRedirect = !id;
  const isLoading = bookLoading || reviewsLoading;
  const hasError = bookError || !book;
  const bookData = book?.data;
  const reviewsData = reviews?.data?.reviews || [];

  return {
    id: id!,
    user,
    isAuthenticated,
    shouldRedirect,
    isLoading,
    hasError,
    bookData,
    reviewsData,
    handleBackClick,
  };
};
