import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { StarRating } from '@/components/StarRating';
import { MessageSquare, User } from 'lucide-react';

interface Review {
  _id: string;
  reviewText: string;
  rating: number;
  reviewer: string | { name: string };
  createdAt: string;
}

interface ReviewsListProps {
  reviews: Review[];
}

export const ReviewsList = ({ reviews }:ReviewsListProps) => {
  return (
    <Card className="bg-cobalt">
      <CardHeader>
        <CardTitle className="text-slateBlue">
          Reviews ({reviews.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        {reviews.length === 0 ? (
          <div className="text-center py-8">
            <MessageSquare className="h-12 w-12 text-slateBlue mx-auto mb-4" />
            <p className="text-slateBlue">
              No reviews yet. Be the first to share your thoughts!
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {reviews.map((review, index) => (
              <div key={review._id}>
                {index > 0 && <Separator className="mb-6" />}
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-slateBlue" />
                      <span className="font-medium text-slateBlue">
                        {typeof review.reviewer === 'object' 
                          ? review.reviewer.name 
                          : 'Anonymous'}
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
  );
};
