import { destroySession } from '@/lib/auth/sessionActions';
import { TbLogout } from 'react-icons/tb';
import { Button } from './ui/button';

export interface LogoutButtonProps extends React.ComponentPropsWithoutRef<'form'> {
  buttonClassName?: string;
}

export default function LogoutButton({
  className,
  buttonClassName,
  ...props
}: LogoutButtonProps) {
  return (
    <form action={destroySession} className={className} {...props}>
      <Button type="submit" variant="destructive" className={buttonClassName}>
        <TbLogout className="mr-2" />
        Log Out
      </Button>
    </form>
  );
}
