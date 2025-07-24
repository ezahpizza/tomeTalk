import React, { useState } from 'react';
import { BookCard } from '@/components/BookCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter, Loader2 } from 'lucide-react';
import { useBooks, useGenres } from '@/hooks/useBooks';
import { Alert, AlertDescription } from '@/components/ui/alert';

export const BookList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [genreFilter, setGenreFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [page, setPage] = useState(1);

  // Fetch books with current filters
  const { 
    data: booksResponse, 
    isLoading: booksLoading, 
    error: booksError 
  } = useBooks({
    page,
    search: searchTerm || undefined,
    genre: genreFilter === 'all' ? undefined : genreFilter,
    sortBy: sortBy === 'date' ? undefined : sortBy,
    limit: 12
  });

  // Fetch genres for filter dropdown
  const { 
    data: genresResponse, 
    isLoading: genresLoading 
  } = useGenres();

  const books = booksResponse?.data?.books || [];
  const pagination = booksResponse?.data?.pagination;
  const genres = genresResponse?.data || [];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1); // Reset to first page when searching
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (booksError) {
    return (
      <div className="min-h-screen bg-charcoal">
        <div className="container mx-auto px-4 py-8">
          <Alert variant="destructive" className="border-2 border-r-8 border-b-8 border-red-500 bg-white">
            <AlertDescription className="text-red-600">
              Failed to load books. Please try again later.
            </AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-charcoal animate-fade-in-up overflow-hidden">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-heading font-bold mb-2 text-white">
            Discover Books
          </h1>
          <p className="text-vioBlue text-lg">
            Explore our collection of books and reviews
          </p>
        </div>

        {/* Filters and Search */}
        <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4 mb-8 p-6 bg-charmPink rounded-lg border-2 border-r-8 border-b-8 border-black shadow-sm">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slateBlue h-4 w-4" />
            <Input
              placeholder="Search books or authors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={genreFilter} onValueChange={setGenreFilter} disabled={genresLoading}>
            <SelectTrigger className="w-full md:w-48">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Filter by genre" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Genres</SelectItem>
              {genres.map(genre => (
                <SelectItem key={genre} value={genre}>{genre}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Sort by..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="date">Newest First</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
              <SelectItem value="title">Title A-Z</SelectItem>
              <SelectItem value="author">Author A-Z</SelectItem>
            </SelectContent>
          </Select>

          <Button type="submit" disabled={booksLoading} className='bg-vioBlue'>
            {booksLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Search className="w-4 h-4" />
            )}
          </Button>
        </form>

        {/* Loading State */}
        {booksLoading && (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-charmPink" />
            <span className="ml-2 text-white">Loading books...</span>
          </div>
        )}

        {/* Book Grid */}
        {!booksLoading && books.length === 0 ? (
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
        ) : (
          !booksLoading && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                {books.map((book, index) => (
                  <div 
                    key={book._id || book.id}
                    className="animate-scale-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <BookCard book={book} />
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {pagination && pagination.pages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-8">
                  <Button
                    variant="neutral"
                    onClick={() => handlePageChange(page - 1)}
                    disabled={page <= 1}
                  >
                    Previous
                  </Button>
                  
                  <span className="mx-4 text-sm text-vioBlue">
                    Page {pagination.current} of {pagination.pages}
                  </span>
                  
                  <Button
                    variant="neutral"
                    onClick={() => handlePageChange(page + 1)}
                    disabled={page >= pagination.pages}
                  >
                    Next
                  </Button>
                </div>
              )}
            </>
          )
        )}
      </div>
    </div>
  );
};