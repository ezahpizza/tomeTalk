import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { StarRating } from '@/components/StarRating';
import { ArrowLeft, MessageSquare, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useBook } from '@/hooks/useBooks';
import { useReviews, useCreateReview } from '@/hooks/useReviews';

const BookDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [newReview, setNewReview] = useState('');
  const [newRating, setNewRating] = useState(0);
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // API hooks
  const { data: book, isLoading: bookLoading, error: bookError } = useBook(id!);
  const { data: reviews, isLoading: reviewsLoading } = useReviews(id!);
  const createReviewMutation = useCreateReview();

  if (!id) {
    navigate('/');
    return null;
  }

  if (bookLoading || reviewsLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-lg text-slateBlue">Loading...</div>
        </div>
      </div>
    );
  }

  if (bookError || !book) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4 text-slateBlue">Book Not Found</h2>
          <Button onClick={() => navigate('/')} className="bg-charmPink text-charcoal">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Books
          </Button>
        </div>
      </div>
    );
  }

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isAuthenticated || !user) {
      toast({
        title: "Authentication required",
        description: "Please log in to submit a review.",
        variant: "destructive",
      });
      return;
    }

    if (newRating === 0) {
      toast({
        title: "Rating required",
        description: "Please select a rating before submitting.",
        variant: "destructive",
      });
      return;
    }

    try {
      await createReviewMutation.mutateAsync({
        bookId: id!,
        data: {
          reviewText: newReview,
          rating: newRating,
        }
      });

      setNewReview('');
      setNewRating(0);

      toast({
        title: "Review submitted!",
        description: "Thank you for sharing your thoughts.",
      });
    } catch (error: unknown) {
      const errorMessage = error instanceof Error && 'response' in error 
        ? (error as { response?: { data?: { message?: string } } }).response?.data?.message || 'Failed to submit review. Please try again.'
        : 'Failed to submit review. Please try again.';
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  if (!book) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <h1 className="text-2xl font-heading font-bold mb-4 text-slateBlue">Book not found</h1>
          <Button onClick={() => navigate('/')} variant="outline" className="border-slateBlue text-slateBlue hover:bg-slateBlue hover:text-charcoal">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Books
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto animate-fade-in-up">
        {/* Book details */}
        <Card className="mb-8 bg-cobalt">
          <CardContent className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
              <div className="aspect-[3/4] bg-gradient-warm rounded-lg flex items-center justify-center mb-4">
                <div className="text-6xl">📚</div>
              </div>
            </div>
            
            <div className="md:col-span-2 space-y-4">
              <div>
                <h1 className="text-3xl font-heading font-bold mb-2 text-slateBlue">{book.data.title}</h1>
                <p className="text-xl text-slateBlue mb-4">by {book.data.author}</p>
                <Badge variant="secondary" className="mb-4 bg-charmPink text-charcoal">{book.data.genre}</Badge>
              </div>

              <div className="flex items-center gap-4">
                <StarRating rating={book.data.averageRating || 0} readonly />
                <span className="text-lg font-semibold text-slateBlue">
                  {book.data.averageRating?.toFixed(1) || '0.0'}
                </span>
                <span className="text-slateBlue">
                  ({book.data.totalReviews || 0} {book.data.totalReviews === 1 ? 'review' : 'reviews'})
                </span>
              </div>

              {book.data.description && (
                <div>
                  <h3 className="font-semibold mb-2 text-slateBlue">Description</h3>
                  <p className="text-slateBlue leading-relaxed">{book.data.description}</p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Add review section */}
      {isAuthenticated && (
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
      )}

      {/* Reviews section */}
      <Card className="bg-cobalt">
        <CardHeader>
          <CardTitle className="text-slateBlue">
            Reviews ({reviews?.data?.reviews?.length || 0})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {!reviews?.data?.reviews || reviews.data.reviews.length === 0 ? (
            <div className="text-center py-8">
              <MessageSquare className="h-12 w-12 text-slateBlue mx-auto mb-4" />
              <p className="text-slateBlue">
                No reviews yet. Be the first to share your thoughts!
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {reviews.data.reviews.map((review, index) => (
                <div key={review._id || review.id}>
                  {index > 0 && <Separator className="mb-6" />}
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-slateBlue" />
                        <span className="font-medium text-slateBlue">
                          {typeof review.reviewer === 'object' 
                            ? review.reviewer.name 
                            : review.reviewerName || 'Anonymous'}
                        </span>
                      </div>
                      <StarRating rating={review.rating} readonly size="sm" />
                      <span className="text-sm text-slateBlue">
                        {new Date(review.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-slateBlue leading-relaxed">
                      {review.reviewText}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
      </div>
    </div>
  );
};

export default BookDetailPage;