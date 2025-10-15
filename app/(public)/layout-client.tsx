'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { LogoSection } from '@/components/navigation/logo-section';
import { UserMenu } from '@/components/navigation/user-menu';
import { UploadFAB } from '@/components/navigation/upload-fab';
import { MobileBottomNav } from '@/components/navigation/mobile-bottom-nav';
import { publicNavConfig, adminNavConfig } from '@/components/navigation/nav-items';
import { getIcon } from '@/components/navigation/icon-map';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface PublicLayoutClientProps {
  session: any;
  children: React.ReactNode;
}

export function PublicLayoutClient({ session, children }: PublicLayoutClientProps) {
  const pathname = usePathname();

  // Show admin nav if user is admin, otherwise show public nav
  const isAdmin = session?.user?.role === 'ADMIN' || session; // Dev mode hack
  const navConfig = isAdmin ? adminNavConfig : publicNavConfig;

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
            <LogoSection variant={isAdmin ? 'admin' : 'public'} />

            <div className="flex items-center gap-4">
              {/* Desktop Navigation - Hidden on mobile */}
              <div className="hidden md:flex items-center gap-2">
                {navConfig.map(({ href, label, icon }) => {
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
              <UserMenu session={session} variant={isAdmin ? 'admin' : 'public'} />
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content - Add padding bottom for mobile nav if admin */}
      <main id="main-content" className={cn(
        "container mx-auto px-4 py-8",
        isAdmin && "pb-24 md:pb-8"
      )}>
        {children}
      </main>

      {/* Mobile Navigation - Only for admin users on mobile */}
      {isAdmin && (
        <>
          <MobileBottomNav items={adminNavConfig} />
          <UploadFAB />
        </>
      )}
    </div>
  );
}
