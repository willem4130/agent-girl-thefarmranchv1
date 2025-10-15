import Link from 'next/link';
import { Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { auth } from '@/auth';

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-white">
      {/* Top Navigation */}
      <nav className="glass border-b border-gray-200/50 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl">
                <ImageIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-semibold">Farm Ranch Media</h1>
                <p className="text-xs text-gray-600">AI Image Gallery</p>
              </div>
            </Link>

            <div className="flex items-center gap-4">
              <Link href="/gallery">
                <Button variant="ghost" size="sm">
                  Gallery
                </Button>
              </Link>
              {session?.user.role === 'ADMIN' ? (
                <Link href="/dashboard">
                  <Button variant="glossy" size="sm">
                    Dashboard
                  </Button>
                </Link>
              ) : (
                <Link href="/login">
                  <Button variant="glossy" size="sm">
                    Sign In
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main>{children}</main>
    </div>
  );
}
