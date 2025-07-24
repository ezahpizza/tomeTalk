import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

interface LoadingStateProps {
  type: 'loading' | 'error' | 'not-found';
  onBackClick?: () => void;
  title?: string;
  message?: string;
}

export const LoadingState = ({ 
  type, 
  onBackClick, 
  title, 
  message 
}:LoadingStateProps) => {
  const renderContent = () => {
    switch (type) {
      case 'loading':
        return (
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-lg text-slateBlue">Loading...</div>
          </div>
        );
      
      case 'error':
      case 'not-found':
        return (
          <div className="text-center py-12">
            <h1 className="text-2xl font-heading font-bold mb-4 text-slateBlue">
              {title || 'Book not found'}
            </h1>
            {message && (
              <p className="text-slateBlue mb-4">{message}</p>
            )}
            {onBackClick && (
              <Button 
                onClick={onBackClick} 
                variant="outline" 
                className="border-slateBlue text-slateBlue hover:bg-slateBlue hover:text-charcoal"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Books
              </Button>
            )}
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {renderContent()}
    </div>
  );
};
