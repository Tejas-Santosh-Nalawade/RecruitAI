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
  Wand2,
  Building,
  MapPin,
  DollarSign,
  Users,
  Clock,
  Zap,
  CheckCircle,
  Copy,
  ExternalLink
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

export default function CreateJobPage() {
  const { user, isLoaded } = useUser()
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [isGenerating, setIsGenerating] = useState(false)
  const [isPosting, setIsPosting] = useState(false)
  const [jobData, setJobData] = useState({
    title: '',
    company: user?.organizationMemberships?.[0]?.organization?.name || '',
    level: '',
    skills: [] as string[],
    location: '',
    type: '',
    salaryRange: { min: 0, max: 0 },
    description: ''
  })
  const [generatedJob, setGeneratedJob] = useState<any>(null)
  const [screeningLink, setScreeningLink] = useState('')

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

  const skillOptions = [
    'JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 'Java',
    'AWS', 'Docker', 'Kubernetes', 'MongoDB', 'PostgreSQL', 'GraphQL',
    'Next.js', 'Vue.js', 'Angular', 'Express.js', 'Django', 'Flask',
    'Machine Learning', 'Data Science', 'DevOps', 'Cybersecurity'
  ]

  const handleSkillToggle = (skill: string) => {
    setJobData(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }))
  }

  const handleGenerateJob = async () => {
    setIsGenerating(true)
    try {
      const response = await fetch('/api/jobs/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(jobData)
      })
      
      const result = await response.json()
      setGeneratedJob(result.job)
      setScreeningLink(result.job.screeningLink)
      setStep(2)
    } catch (error) {
      console.error('Error generating job:', error)
    } finally {
      setIsGenerating(false)
    }
  }

  const handlePostToLinkedIn = async () => {
    setIsPosting(true)
    try {
      const response = await fetch('/api/jobs/linkedin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jobId: generatedJob.id,
          title: generatedJob.title,
          company: generatedJob.company,
          description: generatedJob.description,
          location: generatedJob.location,
          applyUrl: screeningLink
        })
      })
      
      const result = await response.json()
      if (result.success) {
        setStep(3)
      }
    } catch (error) {
      console.error('Error posting to LinkedIn:', error)
    } finally {
      setIsPosting(false)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const handleBackToDashboard = () => {
    window.location.href = '/dashboard'
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
                <h1 className="text-2xl font-bold text-gray-900">Create New Job</h1>
                <p className="text-gray-600">Let AI help you create the perfect job posting</p>
              </div>
            </div>
          </div>
        </header>

        <div className="p-6">
          <div className="max-w-4xl mx-auto">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Brain className="h-6 w-6 text-blue-600" />
                  <span>Job Details</span>
                </CardTitle>
                <CardDescription>
                  Provide basic information and let our AI generate a compelling job description
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Job Title *
                    </label>
                    <Input
                      placeholder="e.g., Senior Frontend Developer"
                      value={jobData.title}
                      onChange={(e) => setJobData(prev => ({ ...prev, title: e.target.value }))}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Company *
                    </label>
                    <Input
                      placeholder="Company name"
                      value={jobData.company}
                      onChange={(e) => setJobData(prev => ({ ...prev, company: e.target.value }))}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Experience Level *
                    </label>
                    <Select value={jobData.level} onValueChange={(value) => setJobData(prev => ({ ...prev, level: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="entry">Entry Level</SelectItem>
                        <SelectItem value="mid">Mid Level</SelectItem>
                        <SelectItem value="senior">Senior Level</SelectItem>
                        <SelectItem value="lead">Lead/Principal</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Job Type *
                    </label>
                    <Select value={jobData.type} onValueChange={(value) => setJobData(prev => ({ ...prev, type: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="full-time">Full-time</SelectItem>
                        <SelectItem value="part-time">Part-time</SelectItem>
                        <SelectItem value="contract">Contract</SelectItem>
                        <SelectItem value="remote">Remote</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Location *
                    </label>
                    <Input
                      placeholder="e.g., San Francisco, CA or Remote"
                      value={jobData.location}
                      onChange={(e) => setJobData(prev => ({ ...prev, location: e.target.value }))}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Salary Range (USD) *
                    </label>
                    <div className="flex space-x-2">
                      <Input
                        type="number"
                        placeholder="Min"
                        value={jobData.salaryRange.min || ''}
                        onChange={(e) => setJobData(prev => ({ 
                          ...prev, 
                          salaryRange: { ...prev.salaryRange, min: parseInt(e.target.value) || 0 }
                        }))}
                      />
                      <Input
                        type="number"
                        placeholder="Max"
                        value={jobData.salaryRange.max || ''}
                        onChange={(e) => setJobData(prev => ({ 
                          ...prev, 
                          salaryRange: { ...prev.salaryRange, max: parseInt(e.target.value) || 0 }
                        }))}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Required Skills *
                  </label>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {skillOptions.map((skill) => (
                      <Badge
                        key={skill}
                        variant={jobData.skills.includes(skill) ? "default" : "outline"}
                        className={`cursor-pointer transition-colors ${
                          jobData.skills.includes(skill) 
                            ? 'bg-blue-600 hover:bg-blue-700' 
                            : 'hover:bg-gray-100'
                        }`}
                        onClick={() => handleSkillToggle(skill)}
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                  <p className="text-sm text-gray-500">
                    Selected: {jobData.skills.length} skills
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Custom Job Description (Optional)
                  </label>
                  <Textarea
                    placeholder="Leave blank to let AI generate the description, or provide your own..."
                    value={jobData.description}
                    onChange={(e) => setJobData(prev => ({ ...prev, description: e.target.value }))}
                    rows={4}
                  />
                </div>

                <Button
                  onClick={handleGenerateJob}
                  disabled={!jobData.title || !jobData.company || !jobData.level || jobData.skills.length === 0 || isGenerating}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  size="lg"
                >
                  {isGenerating ? (
                    <div className="flex items-center space-x-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Generating Job Description...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Wand2 className="h-5 w-5" />
                      <span>Generate Job with AI</span>
                    </div>
                  )}
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
                  Back to Edit
                </Button>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Review & Publish</h1>
                  <p className="text-gray-600">Review your AI-generated job posting</p>
                </div>
              </div>
              <div className="flex space-x-3">
                <Button
                  onClick={handleBackToDashboard}
                  variant="outline"
                >
                  Save Draft
                </Button>
                <Button
                  onClick={handlePostToLinkedIn}
                  disabled={isPosting}
                  className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                >
                  {isPosting ? (
                    <div className="flex items-center space-x-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Publishing...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <ExternalLink className="h-4 w-4" />
                      <span>Publish to LinkedIn</span>
                    </div>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </header>

        <div className="p-6">
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Job Preview */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-2xl mb-2">{generatedJob?.title}</CardTitle>
                    <div className="flex items-center space-x-4 text-gray-600 mb-4">
                      <div className="flex items-center space-x-1">
                        <Building className="h-4 w-4" />
                        <span>{generatedJob?.company}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-4 w-4" />
                        <span>{generatedJob?.location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{generatedJob?.type}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <DollarSign className="h-4 w-4" />
                        <span>{generatedJob?.salary}</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {generatedJob?.skills?.map((skill: string) => (
                        <Badge key={skill} variant="secondary">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="prose max-w-none">
                  <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                    {generatedJob?.description}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Screening Link */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Zap className="h-5 w-5 text-purple-600" />
                  <span>AI Screening Link</span>
                </CardTitle>
                <CardDescription>
                  Candidates will use this link to apply and complete AI screening
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                  <Input
                    value={screeningLink}
                    readOnly
                    className="bg-white"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(screeningLink)}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
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
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Job Published!</h1>
            <p className="text-gray-600 mb-6">
              Your job has been successfully posted to LinkedIn and is now live for candidates to apply.
            </p>
            <div className="space-y-3">
              <Button onClick={handleBackToDashboard} className="w-full">
                Back to Dashboard
              </Button>
              <Button variant="outline" className="w-full">
                View Job Analytics
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return null
}