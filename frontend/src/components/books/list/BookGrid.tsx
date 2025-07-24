import React from 'react';
import { BookCard } from '@/components/BookCard';
import { Book } from '@/types';

interface BookGridProps {
  books: Book[];
  searchTerm: string;
  genreFilter: string;
}

export const BookGrid = ({
  books,
  searchTerm,
  genreFilter,
}:BookGridProps) => {
  if (books.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">📚</div>
        <h3 className="text-xl font-heading font-semibold mb-2 text-white">No books found</h3>
        <p className="text-vioBlue">
          {searchTerm || genreFilter !== 'all' 
            ? 'Try adjusting your search or filters'
            : 'Be the first to add a book!'
          }
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
      {books.map((book, index) => (
        <div 
          key={book._id}
          className="animate-scale-in"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <BookCard book={book} />
        </div>
      ))}
    </div>
  );
};
