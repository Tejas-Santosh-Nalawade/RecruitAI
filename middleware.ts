import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Public routes - no auth required
const publicRoutes = createRouteMatcher([
  '/',
  '/about',
  '/contact',
  '/pricing',
  '/demo',
  '/terms',
  '/privacy',
  '/auth/signin',
  '/auth/signup'
]);

// Protected routes that require authentication
const protectedRoutes = createRouteMatcher([
  '/dashboard',
  '/profile',
  '/jobs',
  '/candidates',
  '/interviews'
]);

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();
  const { pathname } = req.nextUrl;
  
  // Allow public routes
  if (publicRoutes(req)) {
    return NextResponse.next();
  }

  // Redirect unauthenticated users to sign-in
  if (!userId) {
    return NextResponse.redirect(new URL('/auth/signin', req.url));
  }

  // Allow all authenticated users to access protected routes
  // Role checking will be handled in the components themselves
  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};