import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher([
  '/',
  '/about',
  '/contact',
  '/pricing',
  '/demo',
  '/terms',
  '/privacy',
  '/apply/(.*)',
  '/screening/(.*)',
  '/recruiter/signin',
  '/recruiter/signup', 
  '/candidate/signin',
  '/candidate/signup'
]);

const isRecruiterRoute = createRouteMatcher([
  '/dashboard',
  '/jobs/(.*)',
  '/candidates/(.*)',
  '/interviews/(.*)',
  '/analytics/(.*)'
]);

const isCandidateRoute = createRouteMatcher([
  '/candidate/dashboard',
  '/candidate/profile',
  '/candidate/(.*)'
]);

export default clerkMiddleware(async (auth, req) => {
  const { userId, sessionClaims } = await auth();
  
  // Allow public routes
  if (isPublicRoute(req)) {
    return NextResponse.next();
  }

  // Redirect unauthenticated users to appropriate sign-in
  if (!userId) {
    if (isRecruiterRoute(req)) {
      return NextResponse.redirect(new URL('/recruiter/signin', req.url));
    }
    if (isCandidateRoute(req)) {
      return NextResponse.redirect(new URL('/candidate/signin', req.url));
    }
    return NextResponse.redirect(new URL('/', req.url));
  }

  // Get user role from metadata
  const userRole = (sessionClaims?.unsafeMetadata as { role?: string })?.role || 
                   (sessionClaims?.publicMetadata as { role?: string })?.role;

  // Role-based access control
  if (userRole) {
    // Redirect candidates trying to access recruiter routes
    if (isRecruiterRoute(req) && userRole === 'candidate') {
      return NextResponse.redirect(new URL('/candidate/dashboard', req.url));
    }
    
    // Redirect recruiters trying to access candidate routes
    if (isCandidateRoute(req) && userRole === 'recruiter') {
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};