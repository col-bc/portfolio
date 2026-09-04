import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
} from '@/components/ui/alert-dialog';
import { TbTrash } from 'react-icons/tb';

interface ConfirmDeleteProps {
  title: string;
  description?: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

export default function ConfirmDelete({
  title,
  description,
  open,
  onConfirm,
  onOpenChange,
}: ConfirmDeleteProps) {
  const handleDelete = () => {
    onConfirm();
    onOpenChange(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <div className="flex h-14 w-14 items-center justify-center rounded bg-destructive/20">
          <TbTrash className="size-10 text-destructive" />
        </div>
        <h3 className="text-lg font-medium text-foreground">{title}</h3>
        {description && (
          <p className="mb-4 text-sm text-muted-foreground">{description}</p>
        )}
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => onOpenChange(false)}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} variant="destructive">
            I Understand, Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
