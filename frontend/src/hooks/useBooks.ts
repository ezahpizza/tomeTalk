import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
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
