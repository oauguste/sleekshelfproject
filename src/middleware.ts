import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export { default } from "next-auth/middleware";

export async function middleware(request: NextRequest) {
  // Only apply middleware logic for actual page requests
  if (!request.nextUrl.pathname.startsWith('/_next') && !request.nextUrl.pathname.includes('/api/')) {
    const publicRoutes = ['/', '/sign-in'];
    const isPublicRoute = publicRoutes.some(route => request.nextUrl.pathname === route);

    if (!isPublicRoute) {
      try {
        const token = await getToken({ req: request });

        console.log('Request Path:', request.nextUrl.pathname);
        console.log('Token:', token);

        // Redirect to sign-in if there's no token and it's not a public route
        if (!token) {
          console.log('Redirecting to sign-in');
          return NextResponse.redirect(new URL('/sign-in', request.url));
        }
      } catch (error) {
        console.error('Error in middleware token retrieval:', error);
        // Handle the error as needed, maybe redirect to an error page or log the error
        // For example, redirect to a custom error page
        return NextResponse.redirect(new URL('/error', request.url));
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!sign-in).*)'], // Apply middleware to all routes except 'sign-in'
};
