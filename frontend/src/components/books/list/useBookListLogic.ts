import { useState, useEffect } from 'react';
import { useBooks, useGenres } from '@/hooks/useBooks';

export const useBookListLogic = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [genreFilter, setGenreFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4);

  // items per page based on screen size
  useEffect(() => {
    const updateItemsPerPage = () => {
      setItemsPerPage(window.innerWidth < 768 ? 1 : 4);
    };

    updateItemsPerPage();
    window.addEventListener('resize', updateItemsPerPage);
    return () => window.removeEventListener('resize', updateItemsPerPage);
  }, []);

  // Fetch books 
  const { 
    data: booksResponse, 
    isLoading: booksLoading, 
    error: booksError 
  } = useBooks({
    page,
    search: searchTerm || undefined,
    genre: genreFilter === 'all' ? undefined : genreFilter,
    sortBy: sortBy === 'date' ? undefined : sortBy,
    limit: itemsPerPage
  });

  // Fetch genres 
  const { 
    data: genresResponse, 
    isLoading: genresLoading 
  } = useGenres();

  const books = booksResponse?.data?.books || [];
  const pagination = booksResponse?.data?.pagination;
  const genres = genresResponse?.data || [];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
  };

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || (pagination && newPage > pagination.pages)) return;
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Reset page when itemsPerPage changes
  useEffect(() => {
    setPage(1);
  }, [itemsPerPage]);

  return {
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
  };
};
