import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from './useAuth';
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
    mutationFn: ({ bookId, data }: { bookId: string; data: { reviewText: string; rating: number } }) => {
      // Ensure data is properly formatted
      const cleanData = {
        reviewText: data.reviewText.trim(),
        rating: Number(data.rating),
      };
      
      // Validate locally before sending
      if (cleanData.reviewText.length < 10) {
        throw new Error('Review text must be at least 10 characters long');
      }
      if (cleanData.rating < 1 || cleanData.rating > 5) {
        throw new Error('Rating must be between 1 and 5');
      }
      
      return reviewsAPI.createReview(bookId, cleanData);
    },
    onSuccess: (_, variables) => {
      // invalidate reviews for this book
      queryClient.invalidateQueries({ 
        queryKey: REVIEWS_QUERY_KEYS.lists() 
      });
      // invalidate user reviews to show the new review in profile
      queryClient.invalidateQueries({ 
        queryKey: [...REVIEWS_QUERY_KEYS.all, 'user-reviews'] 
      });
      // invalidate book details to update average rating
      queryClient.invalidateQueries({ 
        queryKey: ['books', 'detail', variables.bookId] 
      });
      // invalidate all books to update ratings in book lists
      queryClient.invalidateQueries({ 
        queryKey: ['books'] 
      });
    },
    onError: (error) => {
      console.error('Create review error:', error);
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
      // invalidate user reviews to show updated review in profile
      queryClient.invalidateQueries({ 
        queryKey: [...REVIEWS_QUERY_KEYS.all, 'user-reviews'] 
      });
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
      // invalidate user reviews to remove deleted review from profile
      queryClient.invalidateQueries({ 
        queryKey: [...REVIEWS_QUERY_KEYS.all, 'user-reviews'] 
      });
      // invalidate books to update average ratings
      queryClient.invalidateQueries({ queryKey: ['books'] });
    },
  });
};

export const useUserReviews = (params?: { page?: number; limit?: number }) => {
  const { isAuthenticated, user } = useAuth();
  
  return useQuery({
    queryKey: [...REVIEWS_QUERY_KEYS.all, 'user-reviews', user?._id, { params }],
    queryFn: () => reviewsAPI.getUserReviews(params),
    enabled: isAuthenticated && !!user?._id, // Only run when authenticated and user is loaded
    staleTime: 30000, // Consider data fresh for 30 seconds
    retry: 1, // Only retry once on failure
  });
};
