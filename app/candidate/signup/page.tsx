"use client"

import { SignUp } from '@clerk/nextjs'
import Link from 'next/link'
import { Brain, User } from 'lucide-react'

export default function CandidateSignUpPage() {
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
            <h1 className="text-3xl font-bold text-gray-900">Join as Candidate</h1>
          </div>
          <p className="text-gray-600">Find your dream job with AI assistance</p>
        </div>

        <div className="flex justify-center">
          <SignUp 
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
            signInUrl="/candidate/signin"
            unsafeMetadata={{
              role: "candidate"
            }}
          />
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500 mb-4">
            Are you hiring?{' '}
            <Link href="/recruiter/signup" className="text-green-600 hover:text-green-500 font-medium">
              Sign up as recruiter
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}