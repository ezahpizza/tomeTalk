import axios, { AxiosResponse } from 'axios';
import { Book, Review, User, AuthState } from '@/types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: `${API_URL}/api`,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear token and redirect to login
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  errors?: string[];
}

interface PaginatedResponse<T> {
  success: boolean;
  data: {
    books?: T[];
    reviews?: T[];
    pagination: {
      current: number;
      pages: number;
      total: number;
      limit: number;
    };
  };
}

// Auth 
export const authAPI = {
  signup: async (userData: { name: string; email: string; password: string }) => {
    const response: AxiosResponse<ApiResponse<User & { token: string }>> = await api.post('/auth/signup', userData);
    return response.data;
  },

  login: async (credentials: { email: string; password: string }) => {
    const response: AxiosResponse<ApiResponse<User & { token: string }>> = await api.post('/auth/login', credentials);
    return response.data;
  },

  getMe: async () => {
    const response: AxiosResponse<ApiResponse<User>> = await api.get('/auth/me');
    return response.data;
  },
};

// Books 
export const booksAPI = {
  getBooks: async (params?: {
    page?: number;
    limit?: number;
    genre?: string;
    author?: string;
    search?: string;
    sortBy?: string;
  }) => {
    const response: AxiosResponse<PaginatedResponse<Book>> = await api.get('/books', { params });
    return response.data;
  },

  getBook: async (id: string) => {
    const response: AxiosResponse<ApiResponse<Book>> = await api.get(`/books/${id}`);
    return response.data;
  },

  createBook: async (bookData: {
    title: string;
    author: string;
    genre: string;
    description?: string;
    coverUrl?: string;
  }) => {
    const response: AxiosResponse<ApiResponse<Book>> = await api.post('/books', bookData);
    return response.data;
  },

  updateBook: async (id: string, bookData: Partial<Book>) => {
    const response: AxiosResponse<ApiResponse<Book>> = await api.put(`/books/${id}`, bookData);
    return response.data;
  },

  deleteBook: async (id: string) => {
    const response: AxiosResponse<ApiResponse<{ message: string }>> = await api.delete(`/books/${id}`);
    return response.data;
  },

  getGenres: async () => {
    const response: AxiosResponse<ApiResponse<string[]>> = await api.get('/books/genres');
    return response.data;
  },
};

// Reviews 
export const reviewsAPI = {
  getReviews: async (bookId: string, params?: { page?: number; limit?: number }) => {
    const response: AxiosResponse<PaginatedResponse<Review>> = await api.get(`/reviews/${bookId}`, { params });
    return response.data;
  },

  createReview: async (bookId: string, reviewData: { reviewText: string; rating: number }) => {
    const response: AxiosResponse<ApiResponse<Review>> = await api.post(`/reviews/${bookId}`, reviewData);
    return response.data;
  },

  updateReview: async (reviewId: string, reviewData: { reviewText: string; rating: number }) => {
    const response: AxiosResponse<ApiResponse<Review>> = await api.put(`/reviews/single/${reviewId}`, reviewData);
    return response.data;
  },

  deleteReview: async (reviewId: string) => {
    const response: AxiosResponse<ApiResponse<{ message: string }>> = await api.delete(`/reviews/single/${reviewId}`);
    return response.data;
  },

  getReview: async (reviewId: string) => {
    const response: AxiosResponse<ApiResponse<Review>> = await api.get(`/reviews/single/${reviewId}`);
    return response.data;
  },
};

// Health check
export const healthAPI = {
  check: async () => {
    const response: AxiosResponse<ApiResponse<{ message: string; timestamp: string }>> = await api.get('/health');
    return response.data;
  },
};

export default api;
