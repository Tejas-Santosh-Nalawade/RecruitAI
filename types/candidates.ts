export interface Candidate {
  id: string
  name: string
  email: string
  phone: string
  jobId: string
  resumeUrl: string
  resumeData: ResumeData
  screeningData: ScreeningData
  interviewData?: InterviewData
  totalScore: number
  rank: number
  status: 'applied' | 'screening' | 'interviewed' | 'selected' | 'rejected' | 'hired'
  createdAt: Date
  updatedAt: Date
}

export interface ResumeData {
  skills: string[]
  experience: ExperienceItem[]
  education: EducationItem[]
  certifications: string[]
  summary: string
  score: number
  parsedText: string
}

export interface ExperienceItem {
  company: string
  position: string
  duration: string
  description: string
  skills: string[]
}

export interface EducationItem {
  institution: string
  degree: string
  field: string
  year: string
  gpa?: string
}

export interface ScreeningData {
  questions: ScreeningQuestion[]
  responses: ScreeningResponse[]
  audioUrl: string
  transcript: string
  score: number
  duration: number
  completedAt: Date
}

export interface ScreeningQuestion {
  id: string
  question: string
  type: 'technical' | 'behavioral' | 'experience'
  expectedAnswer?: string
}

export interface ScreeningResponse {
  questionId: string
  answer: string
  audioUrl: string
  score: number
  feedback: string
}

export interface InterviewData {
  scheduledAt: Date
  interviewerType: 'ai' | 'human'
  questions: InterviewQuestion[]
  responses: InterviewResponse[]
  recordingUrl: string
  transcript: string
  score: number
  recommendation: 'hire' | 'no-hire'
  feedback: string
  completedAt: Date
}

export interface InterviewQuestion {
  id: string
  question: string
  type: 'technical' | 'behavioral' | 'situational'
  difficulty: 'easy' | 'medium' | 'hard'
}

export interface InterviewResponse {
  questionId: string
  answer: string
  audioUrl: string
  score: number
  feedback: string
}