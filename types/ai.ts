export interface AIServiceConfig {
  omnidimension: {
    apiKey: string
    baseUrl: string
  }
  vapi: {
    apiKey: string
    assistantId: string
  }
  openai: {
    apiKey: string
    model: string
  }
}

export interface VoiceBotConfig {
  assistantId: string
  voice: string
  language: string
  maxDuration: number
  questions: string[]
}

export interface AIScoring {
  resumeScore: number
  screeningScore: number
  interviewScore?: number
  totalScore: number
  breakdown: {
    skills: number
    experience: number
    communication: number
    technical: number
  }
  feedback: string[]
  recommendation: 'strong-hire' | 'hire' | 'maybe' | 'no-hire'
}

export interface ExperienceItem {
  company: string
  title: string
  duration: string
  description: string
}

export interface EducationItem {
  institution: string
  degree: string
  field: string
  year: string
}

export interface ResumeParsingResult {
  personalInfo: {
    name: string
    email: string
    phone: string
    location: string
  }
  skills: string[]
  experience: ExperienceItem[]
  education: EducationItem[]
  certifications: string[]
  summary: string
  score: number
  matchScore: number
}

export interface VoiceAnalysis {
  transcript: string
  sentiment: 'positive' | 'neutral' | 'negative'
  confidence: number
  keyPoints: string[]
  technicalAccuracy: number
  communicationScore: number
}