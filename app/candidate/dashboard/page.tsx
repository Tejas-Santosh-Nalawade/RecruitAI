"use client"

import { useState, useEffect } from 'react'
import { useUser, UserButton } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { 
  Brain,
  Mic,
  FileText,
  Clock,
  CheckCircle,
  Star,
  Search,
  Briefcase,
  MapPin,
  Building,
  DollarSign,
  Play,
  Calendar,
  TrendingUp,
  Award,
  Target,
  Zap
} from 'lucide-react'
import Link from 'next/link'
import RoleRedirect from '@/components/navigation/role-redirect'

export default function CandidateDashboard() {
  const { user, isLoaded } = useUser()
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedJobType, setSelectedJobType] = useState('all')

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!user) {
    router.push('/candidate/signin')
    return null
  }

  // Mock data for candidate
  const candidateStats = {
    applicationsSubmitted: 8,
    screeningsCompleted: 5,
    interviewsScheduled: 2,
    profileViews: 24,
    profileCompleteness: 85
  }

  const availableJobs = [
    {
      id: '1',
      title: 'Senior Frontend Developer',
      company: 'TechCorp',
      location: 'San Francisco, CA',
      type: 'Full-time',
      salary: '$120k - $160k',
      skills: ['React', 'TypeScript', 'Next.js'],
      postedDate: '2024-01-18',
      applicants: 23,
      matchScore: 92,
      status: 'new'
    },
    {
      id: '2',
      title: 'Full Stack Engineer',
      company: 'StartupXYZ',
      location: 'Remote',
      type: 'Full-time',
      salary: '$100k - $140k',
      skills: ['Node.js', 'React', 'MongoDB'],
      postedDate: '2024-01-17',
      applicants: 15,
      matchScore: 88,
      status: 'new'
    },
    {
      id: '3',
      title: 'React Developer',
      company: 'InnovateLabs',
      location: 'New York, NY',
      type: 'Contract',
      salary: '$80k - $110k',
      skills: ['React', 'JavaScript', 'CSS'],
      postedDate: '2024-01-16',
      applicants: 31,
      matchScore: 85,
      status: 'applied'
    }
  ]

  const myApplications = [
    {
      id: '1',
      jobTitle: 'Senior Frontend Developer',
      company: 'TechCorp',
      appliedDate: '2024-01-15',
      status: 'screening_completed',
      score: 92,
      nextStep: 'Interview Scheduled',
      interviewDate: '2024-01-22 10:00 AM'
    },
    {
      id: '2',
      jobTitle: 'Full Stack Engineer',
      company: 'DevCorp',
      appliedDate: '2024-01-14',
      status: 'under_review',
      score: 88,
      nextStep: 'Awaiting Review',
      interviewDate: null
    },
    {
      id: '3',
      jobTitle: 'React Developer',
      company: 'WebSolutions',
      appliedDate: '2024-01-12',
      status: 'interview_scheduled',
      score: 85,
      nextStep: 'Technical Interview',
      interviewDate: '2024-01-20 2:00 PM'
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'screening_completed': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'interview_scheduled': return 'bg-green-100 text-green-800 border-green-200'
      case 'under_review': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'rejected': return 'bg-red-100 text-red-800 border-red-200'
      case 'hired': return 'bg-purple-100 text-purple-800 border-purple-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getMatchScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600'
    if (score >= 80) return 'text-blue-600'
    if (score >= 70) return 'text-yellow-600'
    return 'text-red-600'
  }

  const startAIScreening = (jobId: string) => {
    router.push(`/screening/${jobId}`)
  }

  const applyToJob = (jobId: string) => {
    router.push(`/apply/${jobId}`)
  }

  return (
    <>
      <RoleRedirect requiredRole="candidate" />
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white border-b sticky top-0 z-50 shadow-sm">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Brain className="h-8 w-8 text-green-600" />
                  <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                    RecruitAI
                  </span>
                </div>
                <div className="hidden md:block h-6 w-px bg-gray-300" />
                <div className="hidden md:block">
                  <h1 className="text-xl font-semibold text-gray-900">Candidate Dashboard</h1>
                  <p className="text-sm text-gray-600">Welcome back, {user.firstName || user.emailAddresses[0].emailAddress}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="relative hidden md:block">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search jobs..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-64 border-gray-200 focus:border-green-500 focus:ring-green-500"
                  />
                </div>
                
                <UserButton 
                  appearance={{
                    elements: {
                      avatarBox: "w-8 h-8"
                    }
                  }}
                  afterSignOutUrl="/"
                />
              </div>
            </div>
          </div>
        </header>

        <div className="p-6">
          {/* Welcome Section */}
          <div className="mb-8">
            <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-8 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold mb-2">Find Your Dream Job</h2>
                  <p className="text-green-100 text-lg">AI-powered job matching and screening to accelerate your career</p>
                </div>
                <div className="hidden md:block">
                  <Brain className="h-24 w-24 text-green-200" />
                </div>
              </div>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
            <Card className="hover:shadow-lg transition-all duration-200 border-0 shadow-md">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Applications</CardTitle>
                <FileText className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{candidateStats.applicationsSubmitted}</div>
                <p className="text-xs text-green-600 font-medium">
                  +2 this week
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-200 border-0 shadow-md">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Screenings</CardTitle>
                <Mic className="h-4 w-4 text-purple-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{candidateStats.screeningsCompleted}</div>
                <p className="text-xs text-blue-600 font-medium">
                  3 pending
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-200 border-0 shadow-md">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Interviews</CardTitle>
                <Calendar className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{candidateStats.interviewsScheduled}</div>
                <p className="text-xs text-green-600 font-medium">
                  Next: Tomorrow 10 AM
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-200 border-0 shadow-md">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Profile Views</CardTitle>
                <TrendingUp className="h-4 w-4 text-orange-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{candidateStats.profileViews}</div>
                <p className="text-xs text-green-600 font-medium">
                  +8 this week
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-200 border-0 shadow-md">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Profile Score</CardTitle>
                <Target className="h-4 w-4 text-indigo-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{candidateStats.profileCompleteness}%</div>
                <p className="text-xs text-blue-600 font-medium">
                  Complete profile
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Available Jobs */}
            <Card className="shadow-md border-0">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="flex items-center space-x-2">
                    <Briefcase className="h-5 w-5 text-green-600" />
                    <span>Recommended Jobs</span>
                  </CardTitle>
                  <CardDescription>AI-matched positions based on your profile</CardDescription>
                </div>
                <Button variant="outline" size="sm" className="border-gray-200">
                  View All
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {availableJobs.map((job) => (
                    <div key={job.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors border-gray-200">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className="font-semibold text-gray-900">{job.title}</h3>
                            {job.status === 'applied' && (
                              <Badge className="bg-blue-100 text-blue-800">Applied</Badge>
                            )}
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                            <div className="flex items-center space-x-1">
                              <Building className="h-3 w-3" />
                              <span>{job.company}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <MapPin className="h-3 w-3" />
                              <span>{job.location}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <DollarSign className="h-3 w-3" />
                              <span>{job.salary}</span>
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-1 mb-2">
                            {job.skills.slice(0, 3).map((skill) => (
                              <span key={skill} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="text-right ml-4">
                          <div className="flex items-center space-x-1 mb-2">
                            <Star className="h-4 w-4 text-yellow-500" />
                            <span className={`font-bold ${getMatchScoreColor(job.matchScore)}`}>
                              {job.matchScore}%
                            </span>
                          </div>
                          <p className="text-xs text-gray-500">Match</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="text-xs text-gray-500">
                          {job.applicants} applicants • Posted {job.postedDate}
                        </div>
                        <div className="flex space-x-2">
                          {job.status === 'new' ? (
                            <>
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => startAIScreening(job.id)}
                                className="border-purple-200 text-purple-700 hover:bg-purple-50"
                              >
                                <Mic className="h-3 w-3 mr-1" />
                                AI Screen
                              </Button>
                              <Button 
                                size="sm"
                                onClick={() => applyToJob(job.id)}
                                className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                              >
                                Apply Now
                              </Button>
                            </>
                          ) : (
                            <Button size="sm" variant="outline" disabled>
                              Applied
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* My Applications */}
            <Card className="shadow-md border-0">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="flex items-center space-x-2">
                    <Clock className="h-5 w-5 text-blue-600" />
                    <span>My Applications</span>
                  </CardTitle>
                  <CardDescription>Track your application progress</CardDescription>
                </div>
                <Button variant="outline" size="sm" className="border-gray-200">
                  View All
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {myApplications.map((application) => (
                    <div key={application.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors border-gray-200">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 mb-1">{application.jobTitle}</h3>
                          <p className="text-sm text-gray-600 mb-2">{application.company}</p>
                          <div className="flex items-center space-x-2 mb-2">
                            <Badge className={getStatusColor(application.status)}>
                              {application.status.replace('_', ' ').toUpperCase()}
                            </Badge>
                            <span className="text-xs text-gray-500">
                              Applied {application.appliedDate}
                            </span>
                          </div>
                        </div>
                        <div className="text-right ml-4">
                          <div className="flex items-center space-x-1 mb-1">
                            <Award className="h-4 w-4 text-blue-500" />
                            <span className={`font-bold ${getMatchScoreColor(application.score)}`}>
                              {application.score}
                            </span>
                          </div>
                          <p className="text-xs text-gray-500">Score</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-700">{application.nextStep}</p>
                          {application.interviewDate && (
                            <p className="text-xs text-green-600">{application.interviewDate}</p>
                          )}
                        </div>
                        <Button size="sm" variant="outline">
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* AI Screening CTA */}
          <Card className="shadow-lg border-0 bg-gradient-to-r from-purple-50 to-blue-50">
            <CardContent className="p-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full flex items-center justify-center">
                    <Mic className="h-8 w-8 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Ready for AI Screening?</h3>
                    <p className="text-gray-600 mb-4">
                      Complete voice screenings for your applied positions and increase your chances of getting hired.
                    </p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>5-10 minutes</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Zap className="h-4 w-4" />
                        <span>AI-powered</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <CheckCircle className="h-4 w-4" />
                        <span>Instant feedback</span>
                      </div>
                    </div>
                  </div>
                </div>
                <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                  <Play className="h-5 w-5 mr-2" />
                  Start Screening
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}