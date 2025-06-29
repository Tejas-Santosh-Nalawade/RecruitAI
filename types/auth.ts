export interface User {
  id: string
  email: string
  name: string
  role: 'recruiter' | 'candidate'
  avatar?: string
  createdAt: Date
  updatedAt: Date
}

export interface AuthState {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterData {
  name: string
  email: string
  password: string
  role: 'recruiter' | 'candidate'
  company?: string
}