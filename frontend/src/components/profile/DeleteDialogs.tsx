import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';

interface DeleteBookDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  bookTitle: string;
}

export const DeleteBookDialog = ({
  isOpen,
  onClose,
  onConfirm,
  bookTitle
}:DeleteBookDialogProps) => {
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="bg-charcoal border-slateBlue/30">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-white font-heading">Delete Book</AlertDialogTitle>
          <AlertDialogDescription className="text-charmPink">
            Are you sure you want to delete "{bookTitle}"? This action cannot be undone and will also delete all reviews for this book.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="bg-charcoal/50 border-slateBlue/30 text-white hover:bg-slateBlue/20">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className="bg-red-500 hover:bg-red-600 text-white"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

interface DeleteReviewDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const DeleteReviewDialog = ({
  isOpen,
  onClose,
  onConfirm
}:DeleteReviewDialogProps) => {
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="bg-charcoal border-slateBlue/30">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-white font-heading">Delete Review</AlertDialogTitle>
          <AlertDialogDescription className="text-charmPink">
            Are you sure you want to delete this review? This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="bg-charcoal/50 border-slateBlue/30 text-white hover:bg-slateBlue/20">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className="bg-red-500 hover:bg-red-600 text-white"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
