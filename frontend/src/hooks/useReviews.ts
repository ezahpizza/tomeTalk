import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { reviewsAPI } from '@/services/api';
import { Review } from '@/types';

// Query keys
export const REVIEWS_QUERY_KEYS = {
  all: ['reviews'] as const,
  lists: () => [...REVIEWS_QUERY_KEYS.all, 'list'] as const,
  list: (bookId: string, filters?: Record<string, string | number>) => 
    [...REVIEWS_QUERY_KEYS.lists(), bookId, { filters }] as const,
  details: () => [...REVIEWS_QUERY_KEYS.all, 'detail'] as const,
  detail: (id: string) => [...REVIEWS_QUERY_KEYS.details(), id] as const,
};

// hooks for reviews
export const useReviews = (bookId: string, params?: { page?: number; limit?: number }) => {
  return useQuery({
    queryKey: REVIEWS_QUERY_KEYS.list(bookId, params),
    queryFn: () => reviewsAPI.getReviews(bookId, params),
    enabled: !!bookId,
  });
};

export const useReview = (reviewId: string) => {
  return useQuery({
    queryKey: REVIEWS_QUERY_KEYS.detail(reviewId),
    queryFn: () => reviewsAPI.getReview(reviewId),
    enabled: !!reviewId,
  });
};

export const useCreateReview = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ bookId, data }: { bookId: string; data: { reviewText: string; rating: number } }) => 
      reviewsAPI.createReview(bookId, data),
    onSuccess: (_, variables) => {
      // invalidate reviews for this book
      queryClient.invalidateQueries({ 
        queryKey: REVIEWS_QUERY_KEYS.lists() 
      });
      //  invalidate book details to update average rating
      queryClient.invalidateQueries({ 
        queryKey: ['books', 'detail', variables.bookId] 
      });
    },
  });
};

export const useUpdateReview = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ reviewId, data }: { reviewId: string; data: { reviewText: string; rating: number } }) => 
      reviewsAPI.updateReview(reviewId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: REVIEWS_QUERY_KEYS.all });
      // invalidate books to update average ratings
      queryClient.invalidateQueries({ queryKey: ['books'] });
    },
  });
};

export const useDeleteReview = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: reviewsAPI.deleteReview,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: REVIEWS_QUERY_KEYS.all });
      // invalidate books to update average ratings
      queryClient.invalidateQueries({ queryKey: ['books'] });
    },
  });
};
