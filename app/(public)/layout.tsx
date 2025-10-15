import { auth } from '@/auth';
import Link from 'next/link';
import { LogoSection } from '@/components/navigation/logo-section';
import { UserMenu } from '@/components/navigation/user-menu';
import { publicNavConfig } from '@/components/navigation/nav-items';
import { Button } from '@/components/ui/button';

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

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
      <nav className="glass border-b border-gray-200/50 sticky top-0 z-50" aria-label="Main navigation">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <LogoSection variant="public" />

            <div className="flex items-center gap-4">
              {/* Public Navigation */}
              <div className="flex items-center gap-2">
                {publicNavConfig.map(({ href, label, icon: Icon }) => (
                  <Link key={href} href={href}>
                    <Button variant="ghost" size="sm">
                      <Icon className="w-4 h-4 mr-2" aria-hidden="true" />
                      {label}
                    </Button>
                  </Link>
                ))}
              </div>

              {/* User Menu */}
              <UserMenu session={session} variant="public" />
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main id="main-content" className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
}
