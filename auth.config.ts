import type { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { prisma } from '@/lib/db/prisma';
import bcrypt from 'bcryptjs';

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard') ||
                           nextUrl.pathname.startsWith('/upload') ||
                           nextUrl.pathname.startsWith('/manage');

      if (isOnDashboard) {
        if (isLoggedIn && auth.user.role === 'ADMIN') return true;
        return false; // Redirect unauthenticated users to login page
      }
      return true;
    },
    jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },
    session({ session, token }) {
      if (token && session.user) {
        session.user.role = token.role as 'ADMIN' | 'CLIENT';
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  providers: [], // Providers will be added in auth.ts
} satisfies NextAuthConfig;
