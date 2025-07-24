export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string): { isValid: boolean; message?: string } => {
  if (password.length < 6) {
    return { isValid: false, message: 'Password must be at least 6 characters long' };
  }
  return { isValid: true };
};

export const validateBookData = (data: {
  title: string;
  author: string;
  genre: string;
  description?: string;
  coverUrl?: string;
}): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (!data.title?.trim()) {
    errors.push('Title is required');
  }

  if (!data.author?.trim()) {
    errors.push('Author is required');
  }

  if (!data.genre?.trim()) {
    errors.push('Genre is required');
  }

  if (data.coverUrl && !isValidUrl(data.coverUrl)) {
    errors.push('Invalid cover URL format');
  }

  return { isValid: errors.length === 0, errors };
};

export const validateReviewData = (data: {
  reviewText: string;
  rating: number;
}): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (!data.reviewText?.trim()) {
    errors.push('Review text is required');
  } else if (data.reviewText.trim().length < 10) {
    errors.push('Review must be at least 10 characters long');
  }

  if (data.rating < 1 || data.rating > 5) {
    errors.push('Rating must be between 1 and 5');
  }

  return { isValid: errors.length === 0, errors };
};

const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};
