import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { StarRating } from '@/components/StarRating';
import { Review, Book } from '@/types';
import { getBookTitleFromReview } from '@/utils/userUtils';

interface ReviewFormData {
  reviewText: string;
  rating: number;
}

interface EditReviewDialogProps {
  review: Review | null;
  isOpen: boolean;
  onClose: () => void;
  formData: ReviewFormData;
  onFormChange: (data: ReviewFormData) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

export const EditReviewDialog = ({
  review,
  isOpen,
  onClose,
  formData,
  onFormChange,
  onSubmit,
  isLoading
}:EditReviewDialogProps) => {
  if (!review) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-charcoal border-slateBlue/30">
        <DialogHeader>
          <DialogTitle className="text-white font-heading">Edit Review</DialogTitle>
          <DialogDescription className="text-charmPink">
            Update your review for "{getBookTitleFromReview(review.book)}".
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label className="text-white">Rating</Label>
            <StarRating
              rating={formData.rating}
              onRatingChange={(rating) => onFormChange({ ...formData, rating })}
              size="lg"
            />
          </div>
          <div>
            <Label htmlFor="reviewText" className="text-white">Review</Label>
            <Textarea
              id="reviewText"
              value={formData.reviewText}
              onChange={(e) => onFormChange({ ...formData, reviewText: e.target.value })}
              className="bg-charcoal/50 border-slateBlue/30 text-white"
              rows={4}
              placeholder="Share your thoughts about this book..."
            />
          </div>
        </div>
        <DialogFooter>
          <Button 
            onClick={onSubmit}
            disabled={isLoading}
            className="bg-vioBlue hover:bg-vioBlue/90 text-white"
          >
            {isLoading ? 'Updating...' : 'Update Review'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
