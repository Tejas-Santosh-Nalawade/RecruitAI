"use client"

import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

interface RoleRedirectProps {
  requiredRole?: 'recruiter' | 'candidate'
  fallbackPath?: string
}

export default function RoleRedirect({ requiredRole, fallbackPath = '/' }: RoleRedirectProps) {
  const { user, isLoaded } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (isLoaded && user) {
      const userRole = user.publicMetadata?.role as string
      
      if (requiredRole && userRole !== requiredRole) {
        if (userRole === 'recruiter') {
          router.push('/dashboard')
        } else if (userRole === 'candidate') {
          router.push('/candidate/profile')
        } else {
          router.push(fallbackPath)
        }
      }
    }
  }, [isLoaded, user, requiredRole, fallbackPath, router])

  return null
}