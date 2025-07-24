export const formatDate = (dateInput: string | Date | null | undefined): string => {
  if (!dateInput) return 'N/A';
  
  try {
    const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
    
    if (isNaN(date.getTime())) {
      return 'N/A';
    }
    
    return date.toLocaleDateString('en-GB');
  } catch (error) {
    console.error('Date formatting error:', error);
    return 'N/A';
  }
};


export const isValidDate = (dateInput: unknown): dateInput is Date => {
  return dateInput instanceof Date && !isNaN(dateInput.getTime());
};
