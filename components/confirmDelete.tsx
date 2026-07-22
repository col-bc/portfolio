import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { TbTrash } from 'react-icons/tb';
import { buttonVariants } from './ui/button';

export default function ConfirmDelete({
  onConfirm,
  onCancel,
  title,
  description,
  children,
}: {
  onConfirm: () => void;
  onCancel?: () => void;
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <AlertDialog>
      <AlertDialogTrigger
        className={buttonVariants({
          variant: 'destructive',
        })}
      >
        {children}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-destructive/20">
          <TbTrash className="h-10 w-10 text-destructive" />
        </div>
        <h3 className="text-lg font-medium text-foreground">{title}</h3>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onCancel ? onCancel : undefined}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm} variant="destructive">
            I understand, delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
