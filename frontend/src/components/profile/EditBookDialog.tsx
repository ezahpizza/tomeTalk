import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Book } from '@/types';

interface BookFormData {
  title: string;
  author: string;
  genre: string;
  description: string;
  coverUrl: string;
}

interface EditBookDialogProps {
  book: Book | null;
  isOpen: boolean;
  onClose: () => void;
  formData: BookFormData;
  onFormChange: (data: BookFormData) => void;
  onSubmit: () => void;
  isLoading: boolean;
  genres: string[];
}

export const EditBookDialog = ({
  book,
  isOpen,
  onClose,
  formData,
  onFormChange,
  onSubmit,
  isLoading,
  genres
}:EditBookDialogProps) => {
  if (!book) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-charcoal border-charmPink">
        <DialogHeader>
          <DialogTitle className="text-vioBlue font-heading">Edit Book</DialogTitle>
          <DialogDescription className="text-charmPink">
            Update your book information.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="title" className="text-vioBlue">Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => onFormChange({ ...formData, title: e.target.value })}
              className="bg-charcoal/50 border-charmPink text-white"
            />
          </div>
          <div>
            <Label htmlFor="author" className="text-vioBlue">Author</Label>
            <Input
              id="author"
              value={formData.author}
              onChange={(e) => onFormChange({ ...formData, author: e.target.value })}
              className="bg-charcoal/50 border-charmPink text-white"
            />
          </div>
          <div>
            <Label htmlFor="genre" className="text-vioBlue">Genre</Label>
            <Select 
              value={formData.genre} 
              onValueChange={(value) => onFormChange({ ...formData, genre: value })}
            >
              <SelectTrigger className="bg-charcoal/50 border-charmPink text-white">
                <SelectValue placeholder="Select a genre" />
              </SelectTrigger>
              <SelectContent className="bg-charcoal border-charmPink">
                {genres.map((genre) => (
                  <SelectItem key={genre} value={genre} className="text-vioBlue hover:bg-slateBlue/20">
                    {genre}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="description" className="text-vioBlue">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => onFormChange({ ...formData, description: e.target.value })}
              className="bg-charcoal/50 border-charmPink text-white"
              rows={3}
            />
          </div>
          <div>
            <Label htmlFor="coverUrl" className="text-vioBlue">Cover URL</Label>
            <Input
              id="coverUrl"
              value={formData.coverUrl}
              onChange={(e) => onFormChange({ ...formData, coverUrl: e.target.value })}
              className="bg-charcoal/50 border-charmPink text-white"
            />
          </div>
        </div>
        <DialogFooter>
          <Button 
            onClick={onSubmit}
            disabled={isLoading}
            className="bg-charmPink hover:bg-charmPink/90 text-white"
          >
            {isLoading ? 'Updating...' : 'Update Book'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
