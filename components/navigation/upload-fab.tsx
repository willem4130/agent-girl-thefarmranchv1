'use client';

import Link from 'next/link';
import { Upload } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';

export function UploadFAB() {
  const pathname = usePathname();

  // Don't show FAB on upload page itself
  if (pathname === '/upload') return null;

  return (
    <Link href="/upload" className="md:hidden">
      <Button
        size="lg"
        aria-label="Upload media"
        className="
          fixed bottom-[80px] right-4 z-50
          h-14 w-14 rounded-full
          bg-gradient-to-r from-blue-600 to-blue-700
          hover:from-blue-700 hover:to-blue-800
          shadow-2xl hover:shadow-3xl
          hover:scale-110 active:scale-95
          transition-all duration-200
          focus-visible:ring-4 focus-visible:ring-blue-600/50
        "
        style={{
          transform: 'translate3d(0, 0, 0)',
        }}
      >
        <Upload className="w-6 h-6" aria-hidden="true" />
      </Button>
    </Link>
  );
}
