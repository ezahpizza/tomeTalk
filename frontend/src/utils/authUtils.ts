/**
 * Authentication utility functions for handling localStorage and token management
 */

export const authStorage = {
  /**
   * Store authentication data in localStorage
   */
  store: (token: string, user: object) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  },

  /**
   * Retrieve authentication data from localStorage
   */
  retrieve: () => {
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');
    
    if (!token || !userStr) {
      return null;
    }

    try {
      const user = JSON.parse(userStr);
      return { token, user };
    } catch (error) {
      console.error('Error parsing stored user data:', error);
      return null;
    }
  },

  /**
   * Clear authentication data from localStorage
   */
  clear: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
};

/**
 * Extract error message from API error response
 */
export const extractErrorMessage = (error: unknown, defaultMessage: string): string => {
  const axiosError = error as { response?: { data?: { message?: string } } };
  return axiosError.response?.data?.message || defaultMessage;
};
