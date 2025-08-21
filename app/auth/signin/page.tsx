"use client"

import { SignIn } from '@clerk/nextjs'
import Link from 'next/link'
import { Brain, Users, UserCheck } from 'lucide-react'
import { useUser } from '@clerk/nextjs'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function SignInPage() {
  const { user, isLoaded } = useUser()
  const router = useRouter()
  const [selectedRole, setSelectedRole] = useState<'candidate' | 'recruiter' | null>(null)

  useEffect(() => {
    if (isLoaded && user && selectedRole) {
      // Set the role in user metadata
      user.update({
        unsafeMetadata: {
          role: selectedRole
        }
      }).then(() => {
        // Redirect based on role
        if (selectedRole === 'candidate') {
          router.push('/dashboard?role=candidate')
        } else {
          router.push('/dashboard?role=recruiter')
        }
      }).catch(() => {
        // Still redirect even if metadata update fails
        if (selectedRole === 'candidate') {
          router.push('/dashboard?role=candidate')
        } else {
          router.push('/dashboard?role=recruiter')
        }
      })
    }
  }, [isLoaded, user, selectedRole, router])

  const handleRoleSelect = (role: 'candidate' | 'recruiter') => {
    setSelectedRole(role)
  }

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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
          <p className="text-gray-600">Sign in to your account</p>
        </div>

        {!selectedRole ? (
          <div className="space-y-4 mb-6">
            <button
              onClick={() => handleRoleSelect('candidate')}
              className="w-full p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 flex items-center space-x-3"
            >
              <UserCheck className="h-6 w-6 text-blue-600" />
              <div className="text-left">
                <div className="font-semibold text-gray-900">I'm a Candidate</div>
                <div className="text-sm text-gray-600">Looking for job opportunities</div>
              </div>
            </button>
            
            <button
              onClick={() => handleRoleSelect('recruiter')}
              className="w-full p-4 border-2 border-gray-200 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-all duration-200 flex items-center space-x-3"
            >
              <Users className="h-6 w-6 text-purple-600" />
              <div className="text-left">
                <div className="font-semibold text-gray-900">I'm a Recruiter</div>
                <div className="text-sm text-gray-600">Hiring and managing candidates</div>
              </div>
            </button>
          </div>
        ) : (
          <div className="mb-6">
            <div className="flex items-center justify-center space-x-2 mb-4">
              {selectedRole === 'candidate' ? (
                <UserCheck className="h-6 w-6 text-blue-600" />
              ) : (
                <Users className="h-6 w-6 text-purple-600" />
              )}
              <span className="text-lg font-semibold text-gray-900">
                Sign in as {selectedRole === 'candidate' ? 'Candidate' : 'Recruiter'}
              </span>
            </div>
            <button
              onClick={() => setSelectedRole(null)}
              className="text-sm text-blue-600 hover:text-blue-500"
            >
              ← Choose different role
            </button>
          </div>
        )}

        {selectedRole && (
          <div className="flex justify-center">
            <SignIn 
              appearance={{
                elements: {
                  formButtonPrimary: 
                    selectedRole === 'candidate'
                      ? "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-sm normal-case"
                      : "bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-sm normal-case",
                  card: "shadow-lg border-0",
                  headerTitle: "text-2xl font-bold",
                  headerSubtitle: "text-gray-600",
                  socialButtonsBlockButton: "border-gray-200 hover:bg-gray-50",
                  formFieldInput: "border-gray-300 focus:border-blue-500 focus:ring-blue-500",
                  footerActionLink: "text-blue-600 hover:text-blue-500"
                }
              }}
              signUpUrl="/auth/signup"
            />
          </div>
        )}

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Don't have an account?{' '}
            <Link href="/auth/signup" className="text-blue-600 hover:text-blue-500 font-medium">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
