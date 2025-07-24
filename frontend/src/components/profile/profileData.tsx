import {
  User,
  BookOpen,
  MessageCircle
} from 'lucide-react';
import { ProfileHeader, BooksList, ReviewsList } from './index';
import { User as UserType, Book, Review } from '@/types';

export interface ProfileItem {
  title: string;
  description: string | React.ReactNode;
  header: React.ReactNode;
  className: string;
  icon: React.ReactNode;
}

interface ProfileDataProps {
  user: UserType;
  userBooks: Book[];
  userReviews: Review[];
  booksLoading: boolean;
  reviewsLoading: boolean;
  onEditBook: (book: Book) => void;
  onDeleteBook: (bookId: string, title: string) => void;
  onEditReview: (review: Review) => void;
  onDeleteReview: (reviewId: string) => void;
}

export const getProfileItems = ({
  user,
  userBooks,
  userReviews,
  booksLoading,
  reviewsLoading,
  onEditBook,
  onDeleteBook,
  onEditReview,
  onDeleteReview,
}: ProfileDataProps): ProfileItem[] => {
  const BooksSection = () => (
    <div className="h-full">
      <BooksList
        books={userBooks}
        isLoading={booksLoading}
        onEdit={onEditBook}
        onDelete={onDeleteBook}
      />
    </div>
  );

  const ReviewsSection = () => (
    <div className="h-full">
      <ReviewsList
        reviews={userReviews}
        isLoading={reviewsLoading}
        onEdit={onEditReview}
        onDelete={onDeleteReview}
      />
    </div>
  );

  return [
    {
      title: "Profile Information",
      description: `Welcome back, ${user.name}! Manage your tomeTalk account.`,
      header: <ProfileHeader user={user} />,
      className: "md:col-span-2 h-full",
      icon: <User className="h-4 w-4 text-slateBlue" />,
    },
    {
      title: "My Books",
      description: "Books you've added to the platform.",
      header: <BooksSection />,
      className: "md:col-span-1 h-full",
      icon: <BookOpen className="h-4 w-4 text-charmPink" />,
    },
    {
      title: "My Reviews",
      description: "Reviews you've written for books.",
      header: <ReviewsSection />,
      className: "md:col-span-1 h-full",
      icon: <MessageCircle className="h-4 w-4 text-vioBlue" />,
    }
  ];
};
