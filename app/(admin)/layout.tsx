import { auth } from '@/auth';
import { AdminLayoutClient } from './layout-client';

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

  return <AdminLayoutClient session={session}>{children}</AdminLayoutClient>;
}
