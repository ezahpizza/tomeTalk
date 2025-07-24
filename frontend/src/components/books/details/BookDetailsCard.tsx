import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { StarRating } from '@/components/StarRating';

interface BookDetailsCardProps {
  book: {
    title: string;
    author: string;
    genre: string;
    description?: string;
    averageRating?: number;
    totalReviews?: number;
    coverUrl?: string;
  };
}

export const BookDetailsCard = ({ book }:BookDetailsCardProps) => {
  return (
    <Card className="mb-8 bg-cobalt">
      <CardContent className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <div className="aspect-[3/4] bg-gradient-warm rounded-lg flex items-center justify-center mb-4">
              {book.coverUrl ? (
                <img
                  src={book.coverUrl}
                  alt={book.title}
                  className="w-full h-full object-cover rounded-lg"
                />
              ) : (
                <div className="text-6xl">📚</div>
              )}
            </div>
          </div>
          
          <div className="md:col-span-2 space-y-4">
            <div>
              <h1 className="text-3xl font-heading font-bold mb-2 text-slateBlue">
                {book.title}
              </h1>
              <p className="text-xl text-slateBlue mb-4">by {book.author}</p>
              <Badge variant="secondary" className="mb-4 bg-charmPink text-charcoal">
                {book.genre}
              </Badge>
            </div>

            <div className="flex items-center gap-4">
              <StarRating rating={book.averageRating || 0} readonly />
              <span className="text-lg font-semibold text-slateBlue">
                {book.averageRating?.toFixed(1) || '0.0'}
              </span>
              <span className="text-slateBlue">
                ({book.totalReviews || 0} {book.totalReviews === 1 ? 'review' : 'reviews'})
              </span>
            </div>

            {book.description && (
              <div>
                <h3 className="font-semibold mb-2 text-slateBlue">Description</h3>
                <p className="text-slateBlue leading-relaxed">{book.description}</p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
