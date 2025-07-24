import { Link } from 'react-router-dom';
import { Book } from '@/types';
import { StarRating } from './StarRating';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface BookCardProps {
  book: Book;
}

export const BookCard = ({ book }:BookCardProps) => {
  const bookId = book._id;
  const createdByName = typeof book.createdBy === 'string' ? book.createdBy : book.createdBy?.name;
  
  return (
    <Link to={`/book/${bookId}`}>
      <Card className="book-card h-full bg-cobalt">
        <CardHeader className="pb-4">
          <div className="aspect-[4/5] bg-gradient-warm rounded-lg mb-4 flex items-center justify-center">
            {book.coverUrl ? (
              <img 
                src={book.coverUrl} 
                alt={book.title}
                className="w-full h-full object-cover rounded-lg"
              />
            ) : (
              <div className="text-4xl font-heading text-muted-foreground">📚</div>
            )}
          </div>
          <h3 className="font-heading text-lg font-semibold line-clamp-2">
            {book.title}
          </h3>
          <p className="text-muted-foreground text-sm">by {book.author}</p>
        </CardHeader>
        <CardContent className="pt-0">
          <Badge variant="secondary" className="mb-3">
            {book.genre}
          </Badge>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <StarRating rating={book.averageRating || 0} readonly size="sm" />
              <span className="text-sm text-muted-foreground">
                {book.averageRating?.toFixed(1) || '0.0'}
              </span>
            </div>
            <span className="text-xs text-muted-foreground">
              {book.totalReviews || 0} reviews
            </span>
          </div>
          {book.description && (
            <p className="text-sm text-muted-foreground mt-3 line-clamp-2">
              {book.description}
            </p>
          )}
          {createdByName && (
            <p className="text-xs text-muted-foreground mt-2">
              Added by {createdByName}
            </p>
          )}
        </CardContent>
      </Card>
    </Link>
  );
};