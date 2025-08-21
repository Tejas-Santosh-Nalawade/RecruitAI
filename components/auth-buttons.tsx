"use client"

import { useUser, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'
import { Zap, Users } from 'lucide-react'
import Link from 'next/link'
import ClientWrapper from './client-wrapper'

interface AuthButtonsProps {
  showHero?: boolean
  showCTA?: boolean
}

export default function AuthButtons({ showHero, showCTA }: AuthButtonsProps) {
  const { user } = useUser()

  const getDashboardLink = () => {
    // Check multiple possible locations for role
    const userRole = user?.unsafeMetadata?.role || 
                     user?.publicMetadata?.role
    
    if (userRole === 'candidate') {
      return '/dashboard?role=candidate'
    }
    return '/dashboard?role=recruiter'
  }

  return (
    <ClientWrapper>
      <div className="flex items-center space-x-3">
        <SignedOut>
          {showHero ? (
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/auth/signup">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 text-lg">
                  Get Started
                  <Zap className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/auth/signin">
                <Button size="lg" variant="outline" className="px-8 py-3 text-lg border-green-600 text-green-600 hover:bg-green-50">
                  Sign In
                  <Users className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          ) : showCTA ? (
            <Link href="/auth/signup">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 text-lg">
                Start Free Trial
              </Button>
            </Link>
          ) : (
            <div className="flex items-center space-x-2">
              <Link href="/auth/signin">
                <Button variant="ghost" size="sm">
                  Sign In
                </Button>
              </Link>
              <Link href="/auth/signup">
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  Get Started
                </Button>
              </Link>
            </div>
          )}
        </SignedOut>
        <SignedIn>
          {showHero || showCTA ? (
            <Link href={getDashboardLink()}>
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 text-lg">
                Go to Dashboard
                <Zap className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          ) : (
            <>
              <Link href={getDashboardLink()}>
                <Button variant="outline" className="mr-2">
                  Dashboard
                </Button>
              </Link>
              <UserButton 
                appearance={{
                  elements: {
                    avatarBox: "w-8 h-8"
                  }
                }}
                afterSignOutUrl="/"
              />
            </>
          )}
        </SignedIn>
      </div>
    </ClientWrapper>
  )
}