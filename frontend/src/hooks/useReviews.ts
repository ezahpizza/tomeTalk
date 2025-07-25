import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from './useAuth';
import { reviewsAPI } from '@/services/api';

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
      const cleanData = {
        reviewText: data.reviewText.trim(),
        rating: Number(data.rating),
      };
      
      if (cleanData.reviewText.length < 10) {
        throw new Error('Review text must be at least 10 characters long');
      }
      if (cleanData.rating < 1 || cleanData.rating > 5) {
        throw new Error('Rating must be between 1 and 5');
      }
      
      return reviewsAPI.createReview(bookId, cleanData);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ 
        queryKey: REVIEWS_QUERY_KEYS.lists() 
      });

      queryClient.invalidateQueries({ 
        queryKey: [...REVIEWS_QUERY_KEYS.all, 'user-reviews'] 
      });

      queryClient.invalidateQueries({ 
        queryKey: ['books', 'detail', variables.bookId] 
      });

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

      queryClient.invalidateQueries({ 
        queryKey: [...REVIEWS_QUERY_KEYS.all, 'user-reviews'] 
      });

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

      queryClient.invalidateQueries({ 
        queryKey: [...REVIEWS_QUERY_KEYS.all, 'user-reviews'] 
      });

      queryClient.invalidateQueries({ queryKey: ['books'] });
    },
  });
};

export const useUserReviews = (params?: { page?: number; limit?: number }) => {
  const { isAuthenticated, user } = useAuth();
  
  return useQuery({
    queryKey: [...REVIEWS_QUERY_KEYS.all, 'user-reviews', user?._id, { params }],
    queryFn: () => reviewsAPI.getUserReviews(params),
    enabled: isAuthenticated && !!user?._id, 
    staleTime: 30000, 
    retry: 1, 
  });
};
