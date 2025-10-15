'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { NavItem } from './nav-items';
import { getIcon } from './icon-map';

interface MobileBottomNavProps {
  items: NavItem[];
}

export function MobileBottomNav({ items }: MobileBottomNavProps) {
  const pathname = usePathname();

  // Filter out Upload (it's in the FAB) and only show 3 items
  const navItems = items.filter(item => !item.showFAB).slice(0, 3);

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 md:hidden
                 bg-white/90 backdrop-blur-lg border-t border-gray-200"
      style={{
        height: 'calc(64px + env(safe-area-inset-bottom))',
        transform: 'translate3d(0, 0, 0)',
        contain: 'layout style paint',
      }}
      aria-label="Mobile navigation"
    >
      <div className="h-16 flex items-center justify-around px-2">
        {navItems.map(({ icon, label, href }) => {
          const Icon = getIcon(icon);
          const isActive = pathname === href ||
                          (href !== '/' && pathname.startsWith(href));

          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex flex-col items-center justify-center',
                'min-w-[72px] min-h-[48px] px-3 py-1.5',
                'rounded-lg transition-colors relative',
                isActive
                  ? 'text-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              )}
              aria-label={label}
              aria-current={isActive ? 'page' : undefined}
            >
              <Icon
                className="w-6 h-6 mb-0.5"
                strokeWidth={isActive ? 2.5 : 2}
                aria-hidden="true"
              />
              <span className={cn(
                'text-xs font-medium',
                isActive && 'font-semibold'
              )}>
                {label}
              </span>
              {/* Active indicator */}
              {isActive && (
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2
                              w-12 h-1 bg-blue-600 rounded-t-full"
                     aria-hidden="true" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
