import { BookForm } from '@/components/books';

const AddBookPage = () => {
  return (
    <div className="select-none container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto animate-fade-in-up">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-heading font-bold mb-2 text-white">Add a New Book</h1>
          <p className="text-charmPink">
            Share a book you've read with the community
          </p>
        </div>

        <BookForm />
      </div>
    </div>
  );
};

export default AddBookPage;