'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { LogoSection } from '@/components/navigation/logo-section';
import { UserMenu } from '@/components/navigation/user-menu';
import { UploadFAB } from '@/components/navigation/upload-fab';
import { MobileBottomNav } from '@/components/navigation/mobile-bottom-nav';
import { adminNavConfig } from '@/components/navigation/nav-items';
import { getIcon } from '@/components/navigation/icon-map';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface AdminLayoutClientProps {
  session: any;
  children: React.ReactNode;
}

export function AdminLayoutClient({ session, children }: AdminLayoutClientProps) {
  const pathname = usePathname();

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
                {adminNavConfig.map(({ href, label, icon }) => {
                  const Icon = getIcon(icon);
                  const isActive = pathname === href || (href !== '/dashboard' && pathname.startsWith(href));

                  return (
                    <Link key={href} href={href}>
                      <Button
                        variant={isActive ? 'default' : 'ghost'}
                        size="sm"
                        className={cn(
                          isActive && 'bg-blue-600 hover:bg-blue-700 text-white'
                        )}
                      >
                        <Icon className="w-4 h-4 mr-2" aria-hidden="true" />
                        {label}
                      </Button>
                    </Link>
                  );
                })}
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
