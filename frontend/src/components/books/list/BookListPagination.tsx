import React from 'react';
import { 
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

interface PaginationData {
  current: number;
  pages: number;
  total: number;
}

interface BookListPaginationProps {
  pagination: PaginationData;
  currentPage: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

export const BookListPagination = ({
  pagination,
  currentPage,
  itemsPerPage,
  onPageChange,
}:BookListPaginationProps) => {
  if (!pagination || pagination.pages <= 1) return null;

  return (
    <>
      <Pagination className="mt-8">
        <PaginationContent className="gap-2">
          <PaginationItem>
            <PaginationPrevious 
              onClick={() => onPageChange(currentPage - 1)}
              className={`cursor-pointer bg-charmPink border-2 border-r-4 border-b-4 border-black hover:translate-x-1 hover:translate-y-1 hover:border-r-2 hover:border-b-2 ${
                currentPage <= 1 ? 'opacity-50 pointer-events-none' : ''
              }`}
            />
          </PaginationItem>
          
          {/* Page numbers */}
          {[...Array(Math.min(pagination.pages, 5))].map((_, index) => {
            let pageNum;
            if (pagination.pages <= 5) {
              pageNum = index + 1;
            } else if (currentPage <= 3) {
              pageNum = index + 1;
            } else if (currentPage >= pagination.pages - 2) {
              pageNum = pagination.pages - 4 + index;
            } else {
              pageNum = currentPage - 2 + index;
            }
            
            return (
              <PaginationItem key={pageNum}>
                <PaginationLink
                  onClick={() => onPageChange(pageNum)}
                  isActive={pageNum === currentPage}
                  className={`cursor-pointer border-2 border-r-4 border-b-4 border-black hover:translate-x-1 hover:translate-y-1 hover:border-r-2 hover:border-b-2 ${
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
              onClick={() => onPageChange(currentPage + 1)}
              className={`cursor-pointer bg-charmPink border-2 border-r-4 border-b-4 border-black hover:translate-x-1 hover:translate-y-1 hover:border-r-2 hover:border-b-2 ${
                currentPage >= pagination.pages ? 'opacity-50 pointer-events-none' : ''
              }`}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>

      {/* Page info */}
      <div className="text-center mt-4">
        <p className="text-sm text-vioBlue">
          Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, pagination.total)} of {pagination.total} books
        </p>
      </div>
    </>
  );
};
