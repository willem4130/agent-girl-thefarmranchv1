// Icon names as strings to avoid passing functions from server to client
export type IconName = 'LayoutDashboard' | 'Upload' | 'Settings' | 'Eye';

export interface NavItem {
  href: string;
  label: string;
  icon: IconName;
  variant?: 'default' | 'ghost' | 'outline' | 'secondary';
  highlight?: boolean;
  showFAB?: boolean;
  adminOnly?: boolean;
}

export const adminNavConfig: NavItem[] = [
  {
    href: '/dashboard',
    label: 'Dashboard',
    icon: 'LayoutDashboard',
    variant: 'ghost',
    adminOnly: true,
  },
  {
    href: '/upload',
    label: 'Upload',
    icon: 'Upload',
    variant: 'ghost',
    showFAB: true,
    adminOnly: true,
  },
  {
    href: '/manage',
    label: 'Manage',
    icon: 'Settings',
    variant: 'ghost',
    adminOnly: true,
  },
  {
    href: '/gallery',
    label: 'Gallery',
    icon: 'Eye',
    variant: 'ghost',
  },
];

export const publicNavConfig: NavItem[] = [
  {
    href: '/gallery',
    label: 'Gallery',
    icon: 'Eye',
    variant: 'ghost',
  },
];
