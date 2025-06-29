"use client"

import { SignUp } from '@clerk/nextjs'
import Link from 'next/link'
import { Brain, Users } from 'lucide-react'
import { useUser } from '@clerk/nextjs'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function RecruiterSignUpPage() {
  const { user, isLoaded } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (isLoaded && user) {
      // Set the role in user metadata after sign up
      user.update({
        unsafeMetadata: {
          role: 'recruiter'
        }
      }).then(() => {
        // Redirect to dashboard after role is set
        router.push('/dashboard')
      }).catch((error) => {
        console.error('Error setting user role:', error)
        // Still redirect even if metadata update fails
        router.push('/dashboard')
      })
    }
  }, [isLoaded, user, router])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-2 mb-6">
            <Brain className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              RecruitAI
            </span>
          </Link>
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Users className="h-6 w-6 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Join as Recruiter</h1>
          </div>
          <p className="text-gray-600">Start hiring with AI-powered recruitment</p>
        </div>

        <div className="flex justify-center">
          <SignUp 
            appearance={{
              elements: {
                formButtonPrimary: 
                  "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-sm normal-case",
                card: "shadow-lg border-0",
                headerTitle: "text-2xl font-bold",
                headerSubtitle: "text-gray-600",
                socialButtonsBlockButton: "border-gray-200 hover:bg-gray-50",
                formFieldInput: "border-gray-300 focus:border-blue-500 focus:ring-blue-500",
                footerActionLink: "text-blue-600 hover:text-blue-500"
              }
            }}
            signInUrl="/recruiter/signin"
            forceRedirectUrl="/dashboard"
          />
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500 mb-4">
            Looking for a job?{' '}
            <Link href="/candidate/signup" className="text-blue-600 hover:text-blue-500 font-medium">
              Sign up as candidate
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}