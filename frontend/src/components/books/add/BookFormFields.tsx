import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useGenres } from '@/hooks/useBooks';
import { BookFormData } from '@/hooks/useBookForm';

interface BookFormFieldsProps {
  formData: BookFormData;
  onFieldChange: (field: keyof BookFormData, value: string) => void;
  disabled?: boolean;
}

export const BookFormFields = ({
  formData,
  onFieldChange,
  disabled = false,
}:BookFormFieldsProps) => {
  const { data: genresResponse, isLoading: genresLoading } = useGenres();
  const genres = genresResponse?.data || [];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="title" className="text-slateBlue">Book Title *</Label>
          <Input
            id="title"
            type="text"
            placeholder="Enter book title"
            value={formData.title}
            onChange={(e) => onFieldChange('title', e.target.value)}
            disabled={disabled}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="author" className="text-slateBlue">Author *</Label>
          <Input
            id="author"
            type="text"
            placeholder="Enter author name"
            value={formData.author}
            onChange={(e) => onFieldChange('author', e.target.value)}
            disabled={disabled}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="genre" className="text-slateBlue">Genre *</Label>
        <Select 
          value={formData.genre} 
          onValueChange={(value) => onFieldChange('genre', value)} 
          disabled={genresLoading || disabled}
        >
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
          value={formData.coverUrl}
          onChange={(e) => onFieldChange('coverUrl', e.target.value)}
          disabled={disabled}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description" className="text-slateBlue">Description (Optional)</Label>
        <Textarea
          id="description"
          placeholder="Brief description of the book..."
          value={formData.description}
          onChange={(e) => onFieldChange('description', e.target.value)}
          rows={4}
          disabled={disabled}
        />
      </div>
    </div>
  );
};
