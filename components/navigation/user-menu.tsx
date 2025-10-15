import { Session } from 'next-auth';
import Link from 'next/link';
import { LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface UserMenuProps {
  session: Session | null;
  variant?: 'admin' | 'public';
}

export function UserMenu({ session, variant = 'public' }: UserMenuProps) {
  if (!session) {
    return (
      <Link href="/login">
        <Button variant="default" size="sm">
          Sign In
        </Button>
      </Link>
    );
  }

  if (variant === 'public' && session.user.role === 'ADMIN') {
    return (
      <Link href="/dashboard">
        <Button variant="default" size="sm">
          Dashboard
        </Button>
      </Link>
    );
  }

  return (
    <div className="flex items-center gap-2 pl-4 border-l border-gray-300">
      <span className="text-sm text-gray-600 hidden sm:inline">
        {session.user.email || 'Dev Mode'}
      </span>
      {session && (
        <form action="/api/auth/signout" method="POST">
          <Button variant="outline" size="sm" type="submit">
            <LogOut className="w-4 h-4 mr-2" aria-hidden="true" />
            Sign Out
          </Button>
        </form>
      )}
    </div>
  );
}
