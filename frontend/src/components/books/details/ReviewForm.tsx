import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StarRating } from '@/components/StarRating';
import { MessageSquare } from 'lucide-react';
import { toast } from 'sonner';
import { useCreateReview } from '@/hooks/useReviews';

interface ReviewFormProps {
  bookId: string;
  isAuthenticated: boolean;
  onReviewSubmitted?: () => void;
}

export const ReviewForm = ({ 
  bookId, 
  isAuthenticated,
  onReviewSubmitted 
}:ReviewFormProps) => {
  const [newReview, setNewReview] = useState('');
  const [newRating, setNewRating] = useState(0);
  const createReviewMutation = useCreateReview();

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      toast.error("Please log in to submit a review.");
      return;
    }

    if (newRating === 0) {
      toast.error("Please select a rating before submitting.");
      return;
    }

    if (newReview.trim().length < 10) {
      toast.error("Review must be at least 10 characters long.");
      return;
    }

    try {
      await createReviewMutation.mutateAsync({
        bookId,
        data: {
          reviewText: newReview.trim(),
          rating: newRating,
        }
      });

      setNewReview('');
      setNewRating(0);

      toast.success("Thank you for sharing your thoughts.");
      onReviewSubmitted?.();
    } catch (error: unknown) {
      console.error('Review submission error:', error);
      
      let errorMessage = 'Failed to submit review. Please try again.';
      
      if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as { 
          response?: { 
            data?: { 
              message?: string; 
              errors?: { msg?: string; message?: string }[] 
            } 
          } 
        };
        if (axiosError.response?.data?.message) {
          errorMessage = axiosError.response.data.message;
        } else if (axiosError.response?.data?.errors?.length) {
          errorMessage = axiosError.response.data.errors
            .map((e: { msg?: string; message?: string }) => e.msg || e.message)
            .join(', ');
        }
      }
      
      toast.error(errorMessage);
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <Card className="mb-8 bg-cobalt">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-slateBlue">
          <MessageSquare className="h-5 w-5" />
          Write a Review
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmitReview} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2 text-slateBlue">Rating</label>
            <StarRating 
              rating={newRating} 
              onRatingChange={setNewRating}
              size="lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2 text-slateBlue">Your Review</label>
            <Textarea
              placeholder="Share your thoughts about this book..."
              value={newReview}
              onChange={(e) => setNewReview(e.target.value)}
              rows={4}
              required
            />
          </div>
          <Button 
            type="submit" 
            className="bg-charmPink text-charcoal"
            disabled={createReviewMutation.isPending || newRating === 0}
          >
            {createReviewMutation.isPending ? 'Submitting...' : 'Submit Review'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
