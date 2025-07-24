import { useState } from 'react';
import { 
  MessageCircle, 
  Edit, 
  Trash2, 
  Calendar 
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { StarRating } from '@/components/StarRating';
import { 
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { Review, Book } from '@/types';
import { getBookTitleFromReview } from '@/utils/userUtils';
import { formatDate } from '@/utils';


interface ReviewItemProps {
  review: Review;
  onEdit: (review: Review) => void;
  onDelete: (reviewId: string) => void;
}

export const ReviewItem = ({ review, onEdit, onDelete }:ReviewItemProps) => {
  return (
    <Card className="bg-charmPink border-charcoal hover:border-vioBlue transition-colors w-full max-w-sm mx-auto">
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h4 className="font-semibold text-charcoal text-sm">
                {getBookTitleFromReview(review.book)}
              </h4>
              <StarRating rating={review.rating} size="sm" readonly />
            </div>
            <p className="text-slateBlue text-xs line-clamp-2 mb-2">
              {review.reviewText}
            </p>
            <div className="flex items-center gap-2 text-xs text-slateBlue">
              <Calendar className="h-3 w-3" />
              {formatDate(review.createdAt)}
            </div>
          </div>
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(review)}
              className="h-8 w-8 p-0 text-slateBlue hover:text-white hover:bg-cobalt/20"
            >
              <Edit className="h-3 w-3" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(review._id)}
              className="h-8 w-8 p-0 text-red-400 hover:text-white hover:bg-red-500/20"
            >
              <Trash2 className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

interface ReviewsListProps {
  reviews: Review[];
  isLoading: boolean;
  onEdit: (review: Review) => void;
  onDelete: (reviewId: string) => void;
}

export const ReviewsList = ({ 
  reviews, 
  isLoading, 
  onEdit, 
  onDelete 
}:ReviewsListProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 1;
  
  const totalPages = Math.ceil(reviews.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentReviews = reviews.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (isLoading) {
    return (
      <div className="space-y-3">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-24 bg-charcoal/50 rounded-lg animate-pulse" />
        ))}
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <div className="text-center py-8 text-slateBlue/60">
        <MessageCircle className="h-12 w-12 mx-auto mb-3 opacity-50" />
        <p>You haven't written any reviews yet.</p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 flex items-center justify-center min-h-[140px]">
        {currentReviews.map((review) => (
          <ReviewItem
            key={review._id}
            review={review}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
      
      {totalPages > 1 && (
        <div className="mt-auto pt-4">
          <Pagination className="justify-center">
            <PaginationContent className="gap-1">
              <PaginationItem>
                <PaginationPrevious 
                  onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                  className={`cursor-pointer bg-charmPink border-2 border-r-4 border-b-4 border-black hover:translate-x-1 hover:translate-y-1 hover:border-r-2 hover:border-b-2 text-xs px-2 py-1 ${
                    currentPage === 1 ? 'opacity-50 pointer-events-none' : ''
                  }`}
                />
              </PaginationItem>
              
              {Array.from({ length: Math.min(totalPages, 3) }, (_, i) => {
                let pageNum;
                if (totalPages <= 3) {
                  pageNum = i + 1;
                } else if (currentPage === 1) {
                  pageNum = i + 1;
                } else if (currentPage === totalPages) {
                  pageNum = totalPages - 2 + i;
                } else {
                  pageNum = currentPage - 1 + i;
                }
                
                return (
                  <PaginationItem key={pageNum}>
                    <PaginationLink
                      onClick={() => handlePageChange(pageNum)}
                      isActive={currentPage === pageNum}
                      className={`cursor-pointer border-2 border-r-4 border-b-4 border-black hover:translate-x-1 hover:translate-y-1 hover:border-r-2 hover:border-b-2 text-xs px-2 py-1 ${
                        pageNum === currentPage 
                          ? 'bg-black text-white' 
                          : 'bg-charmPink hover:bg-vioBlue hover:text-white'
                      }`}
                    >
                      {pageNum}
                    </PaginationLink>
                  </PaginationItem>
                );
              })}
              
              <PaginationItem>
                <PaginationNext 
                  onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                  className={`cursor-pointer bg-charmPink border-2 border-r-4 border-b-4 border-black hover:translate-x-1 hover:translate-y-1 hover:border-r-2 hover:border-b-2 text-xs px-2 py-1 ${
                    currentPage === totalPages ? 'opacity-50 pointer-events-none' : ''
                  }`}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
          
          <div className="text-center mt-2">
            <p className="text-xs text-vioBlue">
              {currentPage} of {totalPages} reviews
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
