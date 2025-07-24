import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/useAuth';
import { useCreateBook } from '@/hooks/useBooks';

export interface BookFormData {
  title: string;
  author: string;
  genre: string;
  description: string;
  coverUrl: string;
}

export const useBookForm = () => {
  const [formData, setFormData] = useState<BookFormData>({
    title: '',
    author: '',
    genre: '',
    description: '',
    coverUrl: '',
  });

  const { user } = useAuth();
  const navigate = useNavigate();
  const createBookMutation = useCreateBook();

  const updateField = (field: keyof BookFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = (): boolean => {
    if (!user) {
      toast.error("Please log in to add a book.");
      return false;
    }

    if (!formData.title.trim() || !formData.author.trim() || !formData.genre) {
      toast.error("Please fill in all required fields.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      const bookData = {
        title: formData.title.trim(),
        author: formData.author.trim(),
        genre: formData.genre,
        description: formData.description.trim() || undefined,
        coverUrl: formData.coverUrl.trim() || undefined,
      };

      await createBookMutation.mutateAsync(bookData);

      toast.success(`"${formData.title}" has been added to the collection.`);
      navigate('/list');
    } catch (error: unknown) {
      const errorMessage = error instanceof Error && 'response' in error 
        ? (error as { response?: { data?: { message?: string } } }).response?.data?.message || 'Failed to add the book. Please try again.'
        : 'Failed to add the book. Please try again.';
      toast.error(errorMessage);
    }
  };

  const handleCancel = () => {
    navigate('/list');
  };

  return {
    formData,
    updateField,
    handleSubmit,
    handleCancel,
    isSubmitting: createBookMutation.isPending,
  };
};
