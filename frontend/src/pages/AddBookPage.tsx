import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useCreateBook, useGenres } from '@/hooks/useBooks';
import { Loader2 } from 'lucide-react';

const AddBookPage = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [description, setDescription] = useState('');
  const [coverUrl, setCoverUrl] = useState('');
  
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const createBookMutation = useCreateBook();
  const { data: genresResponse, isLoading: genresLoading } = useGenres();
  
  const genres = genresResponse?.data || [];

  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to add a book.",
        variant: "destructive",
      });
      return;
    }

    if (!title.trim() || !author.trim() || !genre) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    try {
      const bookData = {
        title: title.trim(),
        author: author.trim(),
        genre,
        description: description.trim() || undefined,
        coverUrl: coverUrl.trim() || undefined,
      };

      const response = await createBookMutation.mutateAsync(bookData);

      toast({
        title: "Book added successfully!",
        description: `"${title}" has been added to the collection.`,
      });

      navigate('/');
    } catch (error: unknown) {
      const errorMessage = error instanceof Error && 'response' in error 
        ? (error as { response?: { data?: { message?: string } } }).response?.data?.message || 'Failed to add the book. Please try again.'
        : 'Failed to add the book. Please try again.';
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto animate-fade-in-up">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-heading font-bold mb-2 text-slateBlue">Add New Book</h1>
          <p className="text-slateBlue">
            Share a book you've read with the community
          </p>
        </div>

        <Card className="bg-cobalt">
          <CardHeader className="text-center">
            <CardTitle className="font-heading text-slateBlue">Book Information</CardTitle>
          </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-slateBlue">Book Title *</Label>
                <Input
                  id="title"
                  type="text"
                  placeholder="Enter book title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="author" className="text-slateBlue">Author *</Label>
                <Input
                  id="author"
                  type="text"
                  placeholder="Enter author name"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="genre" className="text-slateBlue">Genre *</Label>
              <Select value={genre} onValueChange={setGenre} disabled={genresLoading}>
                <SelectTrigger>
                  <SelectValue placeholder={genresLoading ? "Loading genres..." : "Select a genre"} />
                </SelectTrigger>
                <SelectContent>
                  {genres.map((g) => (
                    <SelectItem key={g} value={g}>
                      {g}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="coverUrl" className="text-slateBlue">Cover Image URL (Optional)</Label>
              <Input
                id="coverUrl"
                type="url"
                placeholder="https://example.com/book-cover.jpg"
                value={coverUrl}
                onChange={(e) => setCoverUrl(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-slateBlue">Description (Optional)</Label>
              <Textarea
                id="description"
                placeholder="Brief description of the book..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
              />
            </div>

            <div className="flex gap-4">
              <Button 
                type="submit" 
                className="bg-charmPink text-charcoal flex-1" 
                disabled={createBookMutation.isPending || genresLoading}
              >
                {createBookMutation.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Adding Book...
                  </>
                ) : (
                  'Add Book'
                )}
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => navigate('/')}
                className="flex-1 border-slateBlue text-slateBlue hover:bg-slateBlue hover:text-charcoal"
                disabled={createBookMutation.isPending}
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
      </div>
    </div>
  );
};

export default AddBookPage;