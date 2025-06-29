"use client"

import { SignIn } from '@clerk/nextjs'
import Link from 'next/link'
import { Brain, Users } from 'lucide-react'

export default function RecruiterSignInPage() {
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
            <h1 className="text-3xl font-bold text-gray-900">Recruiter Portal</h1>
          </div>
          <p className="text-gray-600">Sign in to manage your recruitment process</p>
        </div>

        <div className="flex justify-center">
          <SignIn 
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
            redirectUrl="/dashboard"
            signUpUrl="/recruiter/signup"
          />
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500 mb-4">
            Are you a job candidate?{' '}
            <Link href="/candidate/signin" className="text-blue-600 hover:text-blue-500 font-medium">
              Sign in here
            </Link>
          </p>
          <p className="text-xs text-gray-500">
            By signing in, you agree to our{' '}
            <Link href="/terms" className="text-blue-600 hover:text-blue-500">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link href="/privacy" className="text-blue-600 hover:text-blue-500">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}