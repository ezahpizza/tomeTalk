import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { BookFormFields } from './BookFormFields';
import { useBookForm } from '@/hooks/useBookForm';
import { useGenres } from '@/hooks/useBooks';

export const BookForm = () => {
  const { formData, updateField, handleSubmit, handleCancel, isSubmitting } = useBookForm();
  const { isLoading: genresLoading } = useGenres();

  return (
    <Card className="bg-cobalt">
      <CardHeader className="text-center">
        <CardTitle className="font-heading text-slateBlue">Book Information</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <BookFormFields
            formData={formData}
            onFieldChange={updateField}
            disabled={isSubmitting}
          />

          <div className="flex gap-4">
            <Button 
              type="submit" 
              className="bg-charmPink text-charcoal flex-1" 
              disabled={isSubmitting || genresLoading}
            >
              {isSubmitting ? (
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
              onClick={handleCancel}
              className="flex-1 border-slateBlue text-slateBlue hover:bg-slateBlue hover:text-charcoal"
              disabled={isSubmitting}
            >
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
