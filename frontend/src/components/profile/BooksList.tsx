import { useState } from 'react';
import { 
  BookOpen, 
  Edit, 
  Trash2, 
  Star 
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { Book } from '@/types';

interface BookItemProps {
  book: Book;
  onEdit: (book: Book) => void;
  onDelete: (bookId: string, title: string) => void;
}

export const BookItem = ({ book, onEdit, onDelete }:BookItemProps) => {
  return (
    <Card className="bg-slateBlue border-charmPink hover:border-charmPink/40 transition-colors w-full max-w-sm mx-auto">
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h4 className="font-semibold text-white text-sm">{book.title}</h4>
            <p className="text-cobalt/80 text-xs">by {book.author}</p>
            <Badge variant="secondary" className="mt-1 text-xs">
              {book.genre}
            </Badge>
            {(book.averageRating || book.totalReviews !== undefined) && (
              <div className="flex items-center gap-1 mt-1">
                <Star className="h-3 w-3 text-yellow-400 fill-current" />
                <span className="text-xs text-charmPink">
                  {book.totalReviews === 0 
                    ? "No reviews" 
                    : `${book.averageRating.toFixed(1)} (${book.totalReviews} ${book.totalReviews === 1 ? 'review' : 'reviews'})`
                  }
                </span>
              </div>
            )}
          </div>
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(book)}
              className="h-8 w-8 p-0 text-cobalt hover:text-white hover:bg-cobalt/20"
            >
              <Edit className="h-3 w-3" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(book._id, book.title)}
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

interface BooksListProps {
  books: Book[];
  isLoading: boolean;
  onEdit: (book: Book) => void;
  onDelete: (bookId: string, title: string) => void;
}

export const BooksList = ({ 
  books, 
  isLoading, 
  onEdit, 
  onDelete 
}:BooksListProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 1;
  
  const totalPages = Math.ceil(books.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentBooks = books.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (isLoading) {
    return (
      <div className="space-y-3">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-20 bg-charcoal rounded-lg animate-pulse" />
        ))}
      </div>
    );
  }

  if (books.length === 0) {
    return (
      <div className="text-center py-8 text-slateBlue/60">
        <BookOpen className="h-12 w-12 mx-auto mb-3 opacity-50" />
        <p>You haven't added any books yet.</p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 flex items-center justify-center min-h-[120px]">
        {currentBooks.map((book) => (
          <BookItem
            key={book._id}
            book={book}
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
              {currentPage} of {totalPages} books
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
