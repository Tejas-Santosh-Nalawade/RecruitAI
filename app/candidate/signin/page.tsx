"use client"

import { SignIn } from '@clerk/nextjs'
import Link from 'next/link'
import { Brain, User } from 'lucide-react'

export default function CandidateSignInPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-2 mb-6">
            <Brain className="h-8 w-8 text-green-600" />
            <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              RecruitAI
            </span>
          </Link>
          <div className="flex items-center justify-center space-x-2 mb-4">
            <User className="h-6 w-6 text-green-600" />
            <h1 className="text-3xl font-bold text-gray-900">Candidate Portal</h1>
          </div>
          <p className="text-gray-600">Sign in to find jobs and complete AI screenings</p>
        </div>

        <div className="flex justify-center">
          <SignIn 
            appearance={{
              elements: {
                formButtonPrimary: 
                  "bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-sm normal-case",
                card: "shadow-lg border-0",
                headerTitle: "text-2xl font-bold",
                headerSubtitle: "text-gray-600",
                socialButtonsBlockButton: "border-gray-200 hover:bg-gray-50",
                formFieldInput: "border-gray-300 focus:border-green-500 focus:ring-green-500",
                footerActionLink: "text-green-600 hover:text-green-500"
              }
            }}
            redirectUrl="/candidate/dashboard"
            signUpUrl="/candidate/signup"
          />
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500 mb-4">
            Are you a recruiter?{' '}
            <Link href="/recruiter/signin" className="text-green-600 hover:text-green-500 font-medium">
              Sign in here
            </Link>
          </p>
          <p className="text-xs text-gray-500">
            By signing in, you agree to our{' '}
            <Link href="/terms" className="text-green-600 hover:text-green-500">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link href="/privacy" className="text-green-600 hover:text-green-500">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}