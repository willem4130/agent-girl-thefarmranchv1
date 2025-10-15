// Auth middleware disabled for development
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Passthrough middleware - no auth enforcement during development
export default function middleware(request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};

// Re-enable auth for production:
// import NextAuth from 'next-auth';
// import { authConfig } from './auth.config';
// export default NextAuth(authConfig).auth;
