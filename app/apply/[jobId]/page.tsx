"use client"

import { useState } from 'react'
import { useParams } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { 
  Upload, 
  FileText, 
  Mic, 
  Clock, 
  MapPin, 
  Building, 
  DollarSign,
  CheckCircle,
  ArrowRight
} from 'lucide-react'

export default function JobApplicationPage() {
  const params = useParams()
  const jobId = params.jobId as string
  
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    resume: null as File | null
  })

  // Mock job data
  const job = {
    id: jobId,
    title: 'Senior Frontend Developer',
    company: 'TechCorp',
    location: 'San Francisco, CA',
    type: 'Full-time',
    salary: '$120k - $160k',
    description: 'We are looking for a Senior Frontend Developer to join our growing team...',
    requirements: [
      '5+ years of React experience',
      'Strong TypeScript skills',
      'Experience with modern build tools',
      'Knowledge of testing frameworks'
    ],
    skills: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Jest']
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData(prev => ({ ...prev, resume: file }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (step < 3) {
      setStep(step + 1)
    } else {
      // Submit application
      console.log('Application submitted:', formData)
    }
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">Apply for {job.title}</h2>
              <p className="text-gray-600">Step 1: Basic Information</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <Input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <Input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  placeholder="Enter your phone number"
                  required
                />
              </div>

              <Button type="submit" className="w-full">
                Continue to Resume Upload
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">Upload Your Resume</h2>
              <p className="text-gray-600">Step 2: Resume & Document Upload</p>
            </div>

            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Upload your resume</h3>
              <p className="text-gray-600 mb-4">Drag and drop your file here, or click to browse</p>
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileUpload}
                className="hidden"
                id="resume-upload"
              />
              <label htmlFor="resume-upload">
                <Button variant="outline" className="cursor-pointer">
                  <FileText className="mr-2 h-4 w-4" />
                  Choose File
                </Button>
              </label>
              {formData.resume && (
                <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center justify-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="text-green-700">{formData.resume.name}</span>
                  </div>
                </div>
              )}
            </div>

            <Button 
              onClick={() => setStep(3)} 
              className="w-full" 
              disabled={!formData.resume}
            >
              Continue to AI Screening
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">AI Voice Screening</h2>
              <p className="text-gray-600">Step 3: Initial Screening Interview</p>
            </div>

            <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-0">
              <CardContent className="p-6 text-center">
                <Mic className="h-16 w-16 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Ready for your AI screening?</h3>
                <p className="text-gray-600 mb-4">
                  Our AI interviewer will ask you a few questions about your experience and skills. 
                  This typically takes 10-15 minutes.
                </p>
                <div className="flex items-center justify-center space-x-4 text-sm text-gray-500 mb-6">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>10-15 minutes</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Mic className="h-4 w-4" />
                    <span>Voice responses</span>
                  </div>
                </div>
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600">
                  Start AI Screening
                  <Mic className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h4 className="font-semibold text-yellow-800 mb-2">Before you start:</h4>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>• Ensure you're in a quiet environment</li>
                <li>• Check your microphone is working</li>
                <li>• Have your resume details ready to reference</li>
                <li>• Speak clearly and at a normal pace</li>
              </ul>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Job Header */}
          <Card className="mb-8">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-2xl mb-2">{job.title}</CardTitle>
                  <div className="flex items-center space-x-4 text-gray-600 mb-4">
                    <div className="flex items-center space-x-1">
                      <Building className="h-4 w-4" />
                      <span>{job.company}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-4 w-4" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{job.type}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <DollarSign className="h-4 w-4" />
                      <span>{job.salary}</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {job.skills.map((skill) => (
                      <Badge key={skill} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Progress Indicator */}
          <div className="mb-8">
            <div className="flex items-center justify-center space-x-4">
              {[1, 2, 3].map((stepNumber) => (
                <div key={stepNumber} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                    step >= stepNumber 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    {stepNumber}
                  </div>
                  {stepNumber < 3 && (
                    <div className={`w-16 h-1 mx-2 ${
                      step > stepNumber ? 'bg-blue-600' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-center space-x-8 mt-2">
              <span className={`text-sm ${step >= 1 ? 'text-blue-600 font-semibold' : 'text-gray-500'}`}>
                Basic Info
              </span>
              <span className={`text-sm ${step >= 2 ? 'text-blue-600 font-semibold' : 'text-gray-500'}`}>
                Resume
              </span>
              <span className={`text-sm ${step >= 3 ? 'text-blue-600 font-semibold' : 'text-gray-500'}`}>
                AI Screening
              </span>
            </div>
          </div>

          {/* Application Form */}
          <Card>
            <CardContent className="p-8">
              {renderStep()}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}