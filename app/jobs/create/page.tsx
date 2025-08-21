"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '@clerk/nextjs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { 
  Brain,
  ArrowLeft,
  Calendar,
  Clock,
  User,
  Users,
  Mic,
  Video,
  CheckCircle,
  Plus,
  X,
  Bot
} from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import Link from 'next/link'

export default function CreateInterviewPage() {
  const { user, isLoaded } = useUser()
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [isCreating, setIsCreating] = useState(false)
  const [interviewData, setInterviewData] = useState({
    candidateId: '',
    candidateName: '',
    candidateEmail: '',
    jobTitle: '',
    interviewType: '',
    scheduledDate: '',
    scheduledTime: '',
    duration: 60,
    interviewerEmail: '',
    interviewerName: '',
    meetingPlatform: 'google-meet',
    notes: '',
    questions: [] as string[]
  })

  const [newQuestion, setNewQuestion] = useState('')

  // Check authentication and role
  useEffect(() => {
    if (isLoaded && !user) {
      router.replace('/recruiter/signin')
      return
    }

    if (isLoaded && user) {
      const userRole = user.unsafeMetadata?.role || user.publicMetadata?.role
      if (userRole === 'candidate') {
        router.replace('/candidate/dashboard')
        return
      }
      
      // If no role is set, assume recruiter since they're accessing recruiter route
      if (!userRole) {
        user.update({
          unsafeMetadata: {
            role: 'recruiter'
          }
        }).catch(console.error)
      }
    }
  }, [isLoaded, user, router])

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  const userRole = user.unsafeMetadata?.role || user.publicMetadata?.role
  if (userRole === 'candidate') {
    return null // Will be redirected by useEffect
  }

  // Mock candidates data
  const candidates = [
    {
      id: '1',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@email.com',
      jobTitle: 'Senior Frontend Developer',
      score: 92,
      status: 'screening_completed'
    },
    {
      id: '2',
      name: 'Michael Chen',
      email: 'michael.chen@email.com',
      jobTitle: 'Product Manager',
      score: 88,
      status: 'screening_completed'
    },
    {
      id: '3',
      name: 'Emily Rodriguez',
      email: 'emily.rodriguez@email.com',
      jobTitle: 'Data Scientist',
      score: 85,
      status: 'screening_completed'
    }
  ]

  const handleCandidateSelect = (candidateId: string) => {
    const candidate = candidates.find(c => c.id === candidateId)
    if (candidate) {
      setInterviewData(prev => ({
        ...prev,
        candidateId,
        candidateName: candidate.name,
        candidateEmail: candidate.email,
        jobTitle: candidate.jobTitle
      }))
    }
  }

  const addQuestion = () => {
    if (newQuestion.trim()) {
      setInterviewData(prev => ({
        ...prev,
        questions: [...prev.questions, newQuestion.trim()]
      }))
      setNewQuestion('')
    }
  }

  const removeQuestion = (index: number) => {
    setInterviewData(prev => ({
      ...prev,
      questions: prev.questions.filter((_, i) => i !== index)
    }))
  }

  const handleCreateInterview = async () => {
    setIsCreating(true)
    try {
      const response = await fetch('/api/interviews/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...interviewData,
          recruiterId: user?.id,
          createdAt: new Date()
        })
      })
      
      const result = await response.json()
      if (result.success) {
        setStep(3)
      }
    } catch (error) {
      console.error('Error creating interview:', error)
    } finally {
      setIsCreating(false)
    }
  }

  const getDefaultQuestions = (type: string) => {
    const questionSets = {
      'technical': [
        'Walk me through your approach to solving complex technical problems.',
        'Describe a challenging project you worked on and how you overcame obstacles.',
        'How do you stay updated with the latest technology trends?',
        'Explain a time when you had to learn a new technology quickly.'
      ],
      'behavioral': [
        'Tell me about a time when you had to work with a difficult team member.',
        'Describe a situation where you had to meet a tight deadline.',
        'How do you handle constructive criticism?',
        'Give me an example of when you showed leadership.'
      ],
      'ai': [
        'Our AI interviewer will conduct an adaptive conversation based on the candidate\'s responses.',
        'The AI will assess technical skills, communication, and cultural fit automatically.',
        'Questions will be tailored to the specific role and candidate background.',
        'The interview will include follow-up questions based on candidate responses.'
      ]
    }
    return questionSets[type as keyof typeof questionSets] || []
  }

  const handleInterviewTypeChange = (type: string) => {
    setInterviewData(prev => ({
      ...prev,
      interviewType: type,
      questions: getDefaultQuestions(type)
    }))
  }

  const handleBackToDashboard = () => {
    window.location.href = '/recruiter/dashboard'
  }

  if (step === 1) {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white border-b">
          <div className="px-6 py-4">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={handleBackToDashboard}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Schedule Interview</h1>
                <p className="text-gray-600">Create an interview session with AI or human interviewer</p>
              </div>
            </div>
          </div>
        </header>

        <div className="p-6">
          <div className="max-w-4xl mx-auto">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="h-6 w-6 text-blue-600" />
                  <span>Interview Details</span>
                </CardTitle>
                <CardDescription>
                  Select a candidate and configure the interview settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select Candidate *
                    </label>
                    <Select value={interviewData.candidateId} onValueChange={handleCandidateSelect}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose a candidate" />
                      </SelectTrigger>
                      <SelectContent>
                        {candidates.map((candidate) => (
                          <SelectItem key={candidate.id} value={candidate.id}>
                            <div className="flex items-center justify-between w-full">
                              <div>
                                <div className="font-medium">{candidate.name}</div>
                                <div className="text-sm text-gray-500">{candidate.jobTitle}</div>
                              </div>
                              <Badge variant="outline" className="ml-2">
                                Score: {candidate.score}
                              </Badge>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Interview Type *
                    </label>
                    <Select value={interviewData.interviewType} onValueChange={handleInterviewTypeChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select interview type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ai">
                          <div className="flex items-center space-x-2">
                            <Bot className="h-4 w-4 text-purple-600" />
                            <div>
                              <div className="font-medium">AI Voice Interview</div>
                              <div className="text-xs text-gray-500">Automated AI interviewer</div>
                            </div>
                          </div>
                        </SelectItem>
                        <SelectItem value="technical">
                          <div className="flex items-center space-x-2">
                            <Video className="h-4 w-4 text-blue-600" />
                            <div>
                              <div className="font-medium">Technical Interview</div>
                              <div className="text-xs text-gray-500">Human technical assessment</div>
                            </div>
                          </div>
                        </SelectItem>
                        <SelectItem value="behavioral">
                          <div className="flex items-center space-x-2">
                            <Users className="h-4 w-4 text-green-600" />
                            <div>
                              <div className="font-medium">Behavioral Interview</div>
                              <div className="text-xs text-gray-500">Human behavioral assessment</div>
                            </div>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Date *
                    </label>
                    <Input
                      type="date"
                      value={interviewData.scheduledDate}
                      onChange={(e) => setInterviewData(prev => ({ ...prev, scheduledDate: e.target.value }))}
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Time *
                    </label>
                    <Input
                      type="time"
                      value={interviewData.scheduledTime}
                      onChange={(e) => setInterviewData(prev => ({ ...prev, scheduledTime: e.target.value }))}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Duration (minutes) *
                    </label>
                    <Select 
                      value={interviewData.duration.toString()} 
                      onValueChange={(value) => setInterviewData(prev => ({ ...prev, duration: parseInt(value) }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="30">30 minutes</SelectItem>
                        <SelectItem value="45">45 minutes</SelectItem>
                        <SelectItem value="60">60 minutes</SelectItem>
                        <SelectItem value="90">90 minutes</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {interviewData.interviewType !== 'ai' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Interviewer Email *
                      </label>
                      <Input
                        type="email"
                        placeholder="interviewer@company.com"
                        value={interviewData.interviewerEmail}
                        onChange={(e) => setInterviewData(prev => ({ ...prev, interviewerEmail: e.target.value }))}
                      />
                    </div>
                  )}
                </div>

                {interviewData.interviewType !== 'ai' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Meeting Platform
                    </label>
                    <Select 
                      value={interviewData.meetingPlatform} 
                      onValueChange={(value) => setInterviewData(prev => ({ ...prev, meetingPlatform: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="google-meet">Google Meet</SelectItem>
                        <SelectItem value="zoom">Zoom</SelectItem>
                        <SelectItem value="teams">Microsoft Teams</SelectItem>
                        <SelectItem value="phone">Phone Call</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Additional Notes
                  </label>
                  <Textarea
                    placeholder="Any special instructions or notes for the interview..."
                    value={interviewData.notes}
                    onChange={(e) => setInterviewData(prev => ({ ...prev, notes: e.target.value }))}
                    rows={3}
                  />
                </div>

                {/* AI Interview Highlight */}
                {interviewData.interviewType === 'ai' && (
                  <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <Bot className="h-8 w-8 text-purple-600" />
                      <div>
                        <h3 className="text-lg font-semibold text-purple-900">AI Voice Interview</h3>
                        <p className="text-purple-700">Advanced AI interviewer will conduct the session</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-purple-600" />
                        <span className="text-purple-800">Adaptive questioning based on responses</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-purple-600" />
                        <span className="text-purple-800">Real-time sentiment analysis</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-purple-600" />
                        <span className="text-purple-800">Automatic scoring and feedback</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-purple-600" />
                        <span className="text-purple-800">Detailed interview transcript</span>
                      </div>
                    </div>
                  </div>
                )}

                <Button
                  onClick={() => setStep(2)}
                  disabled={!interviewData.candidateId || !interviewData.interviewType || !interviewData.scheduledDate || !interviewData.scheduledTime}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  size="lg"
                >
                  Continue to Questions
                  <ArrowLeft className="h-5 w-5 ml-2 rotate-180" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  if (step === 2) {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white border-b">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="sm" onClick={() => setStep(1)}>
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Details
                </Button>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Interview Questions</h1>
                  <p className="text-gray-600">Configure questions for the interview</p>
                </div>
              </div>
              <Button
                onClick={handleCreateInterview}
                disabled={isCreating}
                className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
              >
                {isCreating ? (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Creating...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4" />
                    <span>Create Interview</span>
                  </div>
                )}
              </Button>
            </div>
          </div>
        </header>

        <div className="p-6">
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Interview Summary */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle>Interview Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <div className="text-sm text-gray-600">Candidate</div>
                    <div className="font-semibold">{interviewData.candidateName}</div>
                    <div className="text-sm text-gray-500">{interviewData.jobTitle}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Date & Time</div>
                    <div className="font-semibold">{interviewData.scheduledDate}</div>
                    <div className="text-sm text-gray-500">{interviewData.scheduledTime} ({interviewData.duration} min)</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Type</div>
                    <Badge className="capitalize">
                      {interviewData.interviewType === 'ai' ? 'AI Voice Interview' : interviewData.interviewType.replace('-', ' ')}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Questions */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  {interviewData.interviewType === 'ai' ? (
                    <Bot className="h-5 w-5 text-purple-600" />
                  ) : (
                    <Mic className="h-5 w-5 text-blue-600" />
                  )}
                  <span>Interview Questions</span>
                </CardTitle>
                <CardDescription>
                  {interviewData.interviewType === 'ai' 
                    ? 'AI will use these guidelines to conduct an adaptive interview'
                    : 'Questions for the interviewer to ask during the session'
                  }
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {interviewData.questions.map((question, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-sm font-semibold text-blue-600 mt-1">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-800">{question}</p>
                    </div>
                    {interviewData.interviewType !== 'ai' && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeQuestion(index)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}

                {interviewData.interviewType !== 'ai' && (
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Add a custom question..."
                      value={newQuestion}
                      onChange={(e) => setNewQuestion(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && addQuestion()}
                    />
                    <Button onClick={addQuestion} variant="outline">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  if (step === 3) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md w-full shadow-lg border-0">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Interview Scheduled!</h1>
            <p className="text-gray-600 mb-6">
              The interview has been scheduled successfully. 
              {interviewData.interviewType === 'ai' 
                ? ' The AI interviewer will conduct the session automatically.'
                : ' Calendar invites will be sent to all participants.'
              }
            </p>
            <div className="space-y-3">
              <Button onClick={handleBackToDashboard} className="w-full">
                Back to Dashboard
              </Button>
              <Button variant="outline" className="w-full">
                View All Interviews
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return null
}