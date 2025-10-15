import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Image as ImageIcon, LayoutDashboard, Upload, Settings, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session || session.user.role !== 'ADMIN') {
    redirect('/login');
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-white">
      {/* Top Navigation */}
      <nav className="glass border-b border-gray-200/50 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/dashboard" className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl">
                <ImageIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-semibold">Farm Ranch Media</h1>
                <p className="text-xs text-gray-600">Admin Panel</p>
              </div>
            </Link>

            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2">
                <Link href="/dashboard">
                  <Button variant="ghost" size="sm">
                    <LayoutDashboard className="w-4 h-4 mr-2" />
                    Dashboard
                  </Button>
                </Link>
                <Link href="/upload">
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-md hover:shadow-lg transition-all"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Upload
                  </Button>
                </Link>
                <Link href="/manage">
                  <Button variant="ghost" size="sm">
                    <Settings className="w-4 h-4 mr-2" />
                    Manage
                  </Button>
                </Link>
                <Link href="/gallery">
                  <Button variant="ghost" size="sm">
                    View Gallery
                  </Button>
                </Link>
              </div>

              <div className="flex items-center gap-2 pl-4 border-l border-gray-300">
                <span className="text-sm text-gray-600 hidden sm:inline">
                  {session.user.email}
                </span>
                <form action="/api/auth/signout" method="POST">
                  <Button variant="outline" size="sm">
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">{children}</main>
    </div>
  );
}
