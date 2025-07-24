import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from './useAuth';
import { booksAPI } from '@/services/api';
import { Book } from '@/types';

export const BOOKS_QUERY_KEYS = {
  all: ['books'] as const,
  lists: () => [...BOOKS_QUERY_KEYS.all, 'list'] as const,
  list: (filters?: Record<string, string | number>) => [...BOOKS_QUERY_KEYS.lists(), { filters }] as const,
  details: () => [...BOOKS_QUERY_KEYS.all, 'detail'] as const,
  detail: (id: string) => [...BOOKS_QUERY_KEYS.details(), id] as const,
  genres: () => [...BOOKS_QUERY_KEYS.all, 'genres'] as const,
};

export const useBooks = (params?: {
  page?: number;
  limit?: number;
  genre?: string;
  author?: string;
  search?: string;
  sortBy?: string;
}) => {
  return useQuery({
    queryKey: BOOKS_QUERY_KEYS.list(params),
    queryFn: () => booksAPI.getBooks(params),
  });
};

export const useBook = (id: string) => {
  return useQuery({
    queryKey: BOOKS_QUERY_KEYS.detail(id),
    queryFn: () => booksAPI.getBook(id),
    enabled: !!id,
  });
};

export const useGenres = () => {
  return useQuery({
    queryKey: BOOKS_QUERY_KEYS.genres(),
    queryFn: () => booksAPI.getGenres(),
  });
};

export const useCreateBook = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: booksAPI.createBook,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: BOOKS_QUERY_KEYS.all });
    },
  });
};

export const useUpdateBook = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Book> }) => 
      booksAPI.updateBook(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: BOOKS_QUERY_KEYS.all });
    },
  });
};

export const useDeleteBook = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: booksAPI.deleteBook,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: BOOKS_QUERY_KEYS.all });
    },
  });
};

export const useUserBooks = (params?: { page?: number; limit?: number }) => {
  const { isAuthenticated, user } = useAuth();
  
  return useQuery({
    queryKey: [...BOOKS_QUERY_KEYS.all, 'user-books', user?._id, { params }],
    queryFn: () => booksAPI.getUserBooks(params),
    enabled: isAuthenticated && !!user?._id, // Only run when authenticated and user is loaded
    staleTime: 30000, // Consider data fresh for 30 seconds
    retry: 1, // Only retry once on failure
  });
};
