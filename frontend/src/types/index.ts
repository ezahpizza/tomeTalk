export interface Book {
  _id: string;
  id?: string; // Keep for backward compatibility
  title: string;
  author: string;
  genre: string;
  description?: string;
  coverUrl?: string;
  averageRating?: number;
  totalReviews?: number;
  createdAt: string;
  updatedAt?: string;
  createdBy: {
    _id: string;
    name: string;
    email?: string;
  } | string;
}

export interface Review {
  _id: string;
  id?: string; // Keep for backward compatibility
  reviewText: string;
  rating: number;
  book: string;
  bookId?: string; // Keep for backward compatibility
  reviewer: {
    _id: string;
    name: string;
  } | string;
  reviewerName?: string; // Keep for backward compatibility
  reviewerId?: string; // Keep for backward compatibility
  createdAt: string;
  updatedAt?: string;
}

export interface User {
  _id: string;
  id?: string; // Keep for backward compatibility
  name: string;
  email: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  errors?: string[];
}

export interface PaginatedApiResponse<T> {
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