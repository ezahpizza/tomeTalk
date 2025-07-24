import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter, Loader2 } from 'lucide-react';

interface BookListFiltersProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  genreFilter: string;
  setGenreFilter: (value: string) => void;
  sortBy: string;
  setSortBy: (value: string) => void;
  genres: string[];
  genresLoading: boolean;
  booksLoading: boolean;
  onSearch: (e: React.FormEvent) => void;
}

export const BookListFilters = ({
  searchTerm,
  setSearchTerm,
  genreFilter,
  setGenreFilter,
  sortBy,
  setSortBy,
  genres,
  genresLoading,
  booksLoading,
  onSearch,
}:BookListFiltersProps) => {
  return (
    <form onSubmit={onSearch} className="flex flex-col md:flex-row gap-4 mb-8 p-6 bg-vioBlue rounded-lg border-2 border-r-8 border-b-8 border-black shadow-sm">
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

      <Button type="submit" disabled={booksLoading} className='bg-charmPink'>
        {booksLoading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <Search className="w-4 h-4" />
        )}
      </Button>
    </form>
  );
};
