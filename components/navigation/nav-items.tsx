import { LayoutDashboard, Upload, Settings, Eye, LucideIcon } from 'lucide-react';

export interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
  variant?: 'default' | 'ghost' | 'outline' | 'secondary';
  highlight?: boolean;
  showFAB?: boolean;
  adminOnly?: boolean;
}

export const adminNavConfig: NavItem[] = [
  {
    href: '/dashboard',
    label: 'Dashboard',
    icon: LayoutDashboard,
    variant: 'ghost',
    adminOnly: true,
  },
  {
    href: '/upload',
    label: 'Upload',
    icon: Upload,
    variant: 'default',
    highlight: true,
    showFAB: true,
    adminOnly: true,
  },
  {
    href: '/manage',
    label: 'Manage',
    icon: Settings,
    variant: 'ghost',
    adminOnly: true,
  },
  {
    href: '/gallery',
    label: 'Gallery',
    icon: Eye,
    variant: 'ghost',
  },
];

export const publicNavConfig: NavItem[] = [
  {
    href: '/gallery',
    label: 'Gallery',
    icon: Eye,
    variant: 'ghost',
  },
];
