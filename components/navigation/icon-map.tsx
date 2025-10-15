import { LayoutDashboard, Upload, Settings, Eye, LucideIcon } from 'lucide-react';
import { IconName } from './nav-items';

export const iconMap: Record<IconName, LucideIcon> = {
  LayoutDashboard,
  Upload,
  Settings,
  Eye,
};

export function getIcon(iconName: IconName): LucideIcon {
  return iconMap[iconName];
}
