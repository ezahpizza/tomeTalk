import {
  BookListFilters,
  BookGrid,
  BookListPagination,
  BookListLoadingState,
  useBookListLogic,
} from '@/components/books/list';
import { Alert, AlertDescription } from '@/components/ui/alert';

export const BookList = () => {
  const {
    // State
    searchTerm,
    setSearchTerm,
    genreFilter,
    setGenreFilter,
    sortBy,
    setSortBy,
    page,
    itemsPerPage,
    
    // Data
    books,
    pagination,
    genres,
    
    // Loading states
    booksLoading,
    booksError,
    genresLoading,
    
    // Handlers
    handleSearch,
    handlePageChange,
  } = useBookListLogic();

  if (booksError) {
    return (
      <div className="select-none min-h-screen bg-charcoal">
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
    <div className="select-none min-h-screen bg-charcoal animate-fade-in-up overflow-hidden">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
            <h1 className="text-4xl font-heading font-bold mb-2 text-white">
              Discover Books
            </h1>
            <p className="text-charmPink text-lg">
              Explore our collection of books and reviews
            </p>
        </div>

        <BookListFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          genreFilter={genreFilter}
          setGenreFilter={setGenreFilter}
          sortBy={sortBy}
          setSortBy={setSortBy}
          genres={genres}
          genresLoading={genresLoading}
          booksLoading={booksLoading}
          onSearch={handleSearch}
        />

        {booksLoading && <BookListLoadingState />}

        {!booksLoading && (
          <>
            <BookGrid
              books={books}
              searchTerm={searchTerm}
              genreFilter={genreFilter}
            />

            <BookListPagination
              pagination={pagination}
              currentPage={page}
              itemsPerPage={itemsPerPage}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </div>
    </div>
  );
};