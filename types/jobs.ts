export interface Job {
  id: string
  title: string
  company: string
  description: string
  requirements: string[]
  skills: string[]
  location: string
  type: 'full-time' | 'part-time' | 'contract' | 'remote'
  salary: {
    min: number
    max: number
    currency: string
  }
  recruiterId: string
  status: 'draft' | 'active' | 'paused' | 'closed'
  screeningLink: string
  linkedinPostId?: string
  createdAt: Date
  updatedAt: Date
}

export interface JobGenerationRequest {
  title: string
  company: string
  level: 'entry' | 'mid' | 'senior' | 'lead'
  skills: string[]
  location: string
  type: 'full-time' | 'part-time' | 'contract' | 'remote'
  salaryRange: {
    min: number
    max: number
  }
}

export interface LinkedinPostData {
  jobId: string
  title: string
  company: string
  description: string
  location: string
  applyUrl: string
}