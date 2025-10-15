import { auth } from '@/auth';
import Link from 'next/link';
import { LogoSection } from '@/components/navigation/logo-section';
import { UserMenu } from '@/components/navigation/user-menu';
import { UploadFAB } from '@/components/navigation/upload-fab';
import { MobileBottomNav } from '@/components/navigation/mobile-bottom-nav';
import { adminNavConfig } from '@/components/navigation/nav-items';
import { Button } from '@/components/ui/button';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  // Auth disabled for development
  // if (!session || session.user.role !== 'ADMIN') {
  //   redirect('/login');
  // }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-white">
      {/* Skip Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded-md"
      >
        Skip to main content
      </a>

      {/* Top Navigation */}
      <nav className="glass border-b border-gray-200/50 sticky top-0 z-50" aria-label="Primary navigation">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <LogoSection variant="admin" />

            <div className="flex items-center gap-4">
              {/* Desktop Navigation - Hidden on mobile */}
              <div className="hidden md:flex items-center gap-2">
                {adminNavConfig.map(({ href, label, icon: Icon, highlight }) => (
                  <Link key={href} href={href}>
                    <Button
                      variant={highlight ? 'default' : 'ghost'}
                      size="sm"
                      className={
                        highlight
                          ? 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-md hover:shadow-lg transition-all'
                          : ''
                      }
                    >
                      <Icon className="w-4 h-4 mr-2" aria-hidden="true" />
                      {label}
                    </Button>
                  </Link>
                ))}
              </div>

              {/* User Menu */}
              <UserMenu session={session} variant="admin" />
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content - Add padding bottom for mobile nav */}
      <main id="main-content" className="container mx-auto px-4 py-8 pb-24 md:pb-8">
        {children}
      </main>

      {/* Mobile Navigation - Only on mobile */}
      <MobileBottomNav items={adminNavConfig} />

      {/* Upload FAB - Only on mobile */}
      <UploadFAB />
    </div>
  );
}
