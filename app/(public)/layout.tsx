import { auth } from '@/auth';
import { PublicLayoutClient } from './layout-client';

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return <PublicLayoutClient session={session}>{children}</PublicLayoutClient>;
}
