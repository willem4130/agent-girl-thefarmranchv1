import Link from 'next/link';
import { Image as ImageIcon } from 'lucide-react';

interface LogoSectionProps {
  variant?: 'admin' | 'public';
}

export function LogoSection({ variant = 'public' }: LogoSectionProps) {
  const href = variant === 'admin' ? '/dashboard' : '/';

  return (
    <Link
      href={href}
      className="flex items-center gap-3"
      aria-label="Farm Ranch Media - Home"
    >
      <div className="p-2 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl">
        <ImageIcon className="w-6 h-6 text-white" aria-hidden="true" />
      </div>
      <div>
        <h1 className="text-lg font-semibold">Farm Ranch Media</h1>
        <p className="text-xs text-gray-600">
          {variant === 'admin' ? 'Admin Panel' : 'AI Image Gallery'}
        </p>
      </div>
    </Link>
  );
}
