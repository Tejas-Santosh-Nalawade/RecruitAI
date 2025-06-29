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
  Zap,
  Upload,
  Eye,
  Download,
  Video,
  Phone,
  ExternalLink,
  User,
  Settings,
  Bell,
  Filter
} from 'lucide-react'
import Link from 'next/link'

export default function CandidateDashboard() {
  const { user, isLoaded } = useUser()
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedJobType, setSelectedJobType] = useState('all')

  // Check authentication and role
  useEffect(() => {
    if (isLoaded && !user) {
      router.replace('/candidate/signin')
      return
    }

    if (isLoaded && user) {
      const userRole = user.unsafeMetadata?.role || user.publicMetadata?.role
      if (userRole === 'recruiter') {
        router.replace('/dashboard')
        return
      }
      
      // If no role is set, assume candidate since they're accessing candidate route
      if (!userRole) {
        user.update({
          unsafeMetadata: {
            role: 'candidate'
          }
        }).catch(console.error)
      }
    }
  }, [isLoaded, user, router])

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  const userRole = user.unsafeMetadata?.role || user.publicMetadata?.role
  if (userRole === 'recruiter') {
    return null // Will be redirected by useEffect
  }

  // Mock data for candidate
  const candidateStats = {
    applicationsSubmitted: 8,
    screeningsCompleted: 5,
    interviewsScheduled: 2,
    profileViews: 24,
    profileCompleteness: 85,
    averageScore: 88
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
      status: 'new',
      description: 'Join our innovative team building next-generation web applications...',
      recruiterName: 'Sarah Wilson'
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
      status: 'new',
      description: 'Build scalable applications in a fast-paced startup environment...',
      recruiterName: 'Mike Johnson'
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
      status: 'applied',
      description: 'Create beautiful user interfaces for cutting-edge products...',
      recruiterName: 'Emily Chen'
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
      interviewDate: '2024-01-22 10:00 AM',
      interviewType: 'AI Interview',
      interviewLink: 'https://recruitai.com/interview/ai-123',
      recruiterName: 'Sarah Wilson',
      feedback: 'Excellent technical skills demonstrated in screening'
    },
    {
      id: '2',
      jobTitle: 'Full Stack Engineer',
      company: 'DevCorp',
      appliedDate: '2024-01-14',
      status: 'under_review',
      score: 88,
      nextStep: 'Awaiting Review',
      interviewDate: null,
      interviewType: null,
      interviewLink: null,
      recruiterName: 'John Smith',
      feedback: 'Strong candidate, reviewing with team'
    },
    {
      id: '3',
      jobTitle: 'React Developer',
      company: 'WebSolutions',
      appliedDate: '2024-01-12',
      status: 'interview_scheduled',
      score: 85,
      nextStep: 'Technical Interview',
      interviewDate: '2024-01-20 2:00 PM',
      interviewType: 'Video Call',
      interviewLink: 'https://meet.google.com/abc-def-ghi',
      recruiterName: 'Lisa Brown',
      feedback: 'Looking forward to technical discussion'
    }
  ]

  const upcomingInterviews = [
    {
      id: '1',
      jobTitle: 'Senior Frontend Developer',
      company: 'TechCorp',
      date: '2024-01-22',
      time: '10:00 AM',
      type: 'AI Interview',
      duration: '45 min',
      link: 'https://recruitai.com/interview/ai-123',
      recruiterName: 'Sarah Wilson',
      status: 'confirmed'
    },
    {
      id: '2',
      jobTitle: 'React Developer',
      company: 'WebSolutions',
      date: '2024-01-20',
      time: '2:00 PM',
      type: 'Video Call',
      duration: '60 min',
      link: 'https://meet.google.com/abc-def-ghi',
      recruiterName: 'Lisa Brown',
      status: 'confirmed'
    }
  ]

  const screeningAssessments = [
    {
      id: '1',
      jobTitle: 'Senior Frontend Developer',
      company: 'TechCorp',
      completedDate: '2024-01-16',
      score: 92,
      status: 'completed',
      feedback: 'Excellent technical knowledge and communication skills',
      duration: '12 minutes',
      questionsAnswered: 5
    },
    {
      id: '2',
      jobTitle: 'Full Stack Engineer',
      company: 'DevCorp',
      completedDate: '2024-01-15',
      score: 88,
      status: 'completed',
      feedback: 'Strong problem-solving abilities demonstrated',
      duration: '10 minutes',
      questionsAnswered: 4
    },
    {
      id: '3',
      jobTitle: 'Product Manager',
      company: 'StartupXYZ',
      completedDate: null,
      score: null,
      status: 'pending',
      feedback: null,
      duration: null,
      questionsAnswered: null
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'screening_completed': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'interview_scheduled': return 'bg-green-100 text-green-800 border-green-200'
      case 'under_review': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'rejected': return 'bg-red-100 text-red-800 border-red-200'
      case 'hired': return 'bg-purple-100 text-purple-800 border-purple-200'
      case 'completed': return 'bg-green-100 text-green-800 border-green-200'
      case 'pending': return 'bg-orange-100 text-orange-800 border-orange-200'
      case 'confirmed': return 'bg-blue-100 text-blue-800 border-blue-200'
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

  const joinInterview = (link: string) => {
    window.open(link, '_blank')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b sticky top-0 z-50 shadow-sm">
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
                <h1 className="text-xl font-semibold text-gray-900">Candidate Portal</h1>
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
              
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-5 w-5 text-gray-600" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </Button>
              
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
          <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-8 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold mb-2">Find Your Dream Job</h2>
                  <p className="text-green-100 text-lg mb-4">AI-powered job matching and screening to accelerate your career</p>
                  <div className="flex items-center space-x-6 text-sm">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4" />
                      <span>AI-Powered Matching</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Mic className="h-4 w-4" />
                      <span>Voice Screening</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Zap className="h-4 w-4" />
                      <span>Instant Feedback</span>
                    </div>
                  </div>
                </div>
                <div className="hidden md:block">
                  <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center">
                    <Brain className="h-12 w-12 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Button 
              variant="outline" 
              className="h-auto p-4 flex flex-col items-center space-y-2 hover:bg-green-50 hover:border-green-200 border-2"
            >
              <Upload className="h-6 w-6 text-green-600" />
              <span className="text-sm font-medium">Upload Resume</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-auto p-4 flex flex-col items-center space-y-2 hover:bg-blue-50 hover:border-blue-200 border-2"
            >
              <Mic className="h-6 w-6 text-blue-600" />
              <span className="text-sm font-medium">AI Screening</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-auto p-4 flex flex-col items-center space-y-2 hover:bg-purple-50 hover:border-purple-200 border-2"
            >
              <Search className="h-6 w-6 text-purple-600" />
              <span className="text-sm font-medium">Browse Jobs</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-auto p-4 flex flex-col items-center space-y-2 hover:bg-orange-50 hover:border-orange-200 border-2"
            >
              <User className="h-6 w-6 text-orange-600" />
              <span className="text-sm font-medium">Update Profile</span>
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 mb-8">
          <Card className="hover:shadow-lg transition-all duration-200 border-0 shadow-md bg-gradient-to-br from-blue-50 to-blue-100">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-800">Applications</CardTitle>
              <FileText className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-900">{candidateStats.applicationsSubmitted}</div>
              <p className="text-xs text-blue-600 font-medium">
                +2 this week
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-200 border-0 shadow-md bg-gradient-to-br from-purple-50 to-purple-100">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-purple-800">Screenings</CardTitle>
              <Mic className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-900">{candidateStats.screeningsCompleted}</div>
              <p className="text-xs text-purple-600 font-medium">
                3 pending
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-200 border-0 shadow-md bg-gradient-to-br from-green-50 to-green-100">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-green-800">Interviews</CardTitle>
              <Calendar className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-900">{candidateStats.interviewsScheduled}</div>
              <p className="text-xs text-green-600 font-medium">
                Next: Tomorrow 10 AM
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-200 border-0 shadow-md bg-gradient-to-br from-orange-50 to-orange-100">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-orange-800">Profile Views</CardTitle>
              <TrendingUp className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-900">{candidateStats.profileViews}</div>
              <p className="text-xs text-orange-600 font-medium">
                +8 this week
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-200 border-0 shadow-md bg-gradient-to-br from-indigo-50 to-indigo-100">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-indigo-800">Profile Score</CardTitle>
              <Target className="h-4 w-4 text-indigo-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-indigo-900">{candidateStats.profileCompleteness}%</div>
              <p className="text-xs text-indigo-600 font-medium">
                Complete profile
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-200 border-0 shadow-md bg-gradient-to-br from-pink-50 to-pink-100">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-pink-800">Avg Score</CardTitle>
              <Award className="h-4 w-4 text-pink-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-pink-900">{candidateStats.averageScore}</div>
              <p className="text-xs text-pink-600 font-medium">
                Excellent rating
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Available Jobs */}
          <Card className="shadow-lg border-0">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="flex items-center space-x-2">
                  <Briefcase className="h-5 w-5 text-green-600" />
                  <span>Recommended Jobs</span>
                </CardTitle>
                <CardDescription>AI-matched positions based on your profile</CardDescription>
              </div>
              <Button variant="outline" size="sm" className="border-gray-200">
                <Filter className="h-4 w-4 mr-2" />
                Filter
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
                        <p className="text-sm text-gray-600 mb-2 line-clamp-2">{job.description}</p>
                        <div className="flex flex-wrap gap-1 mb-2">
                          {job.skills.slice(0, 3).map((skill) => (
                            <span key={skill} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                              {skill}
                            </span>
                          ))}
                        </div>
                        <p className="text-xs text-gray-500">Posted by {job.recruiterName}</p>
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
          <Card className="shadow-lg border-0">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-blue-600" />
                  <span>My Applications</span>
                </CardTitle>
                <CardDescription>Track your application progress</CardDescription>
              </div>
              <Button variant="outline" size="sm" className="border-gray-200">
                <Eye className="h-4 w-4 mr-2" />
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
                        <p className="text-xs text-gray-600 mb-2">{application.feedback}</p>
                        <p className="text-xs text-gray-500">Recruiter: {application.recruiterName}</p>
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
                          <div className="flex items-center space-x-2 mt-1">
                            <p className="text-xs text-green-600">{application.interviewDate}</p>
                            <Badge variant="outline" className="text-xs">
                              {application.interviewType}
                            </Badge>
                          </div>
                        )}
                      </div>
                      <div className="flex space-x-2">
                        {application.interviewLink && (
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => joinInterview(application.interviewLink!)}
                            className="border-green-200 text-green-700 hover:bg-green-50"
                          >
                            <ExternalLink className="h-3 w-3 mr-1" />
                            Join
                          </Button>
                        )}
                        <Button size="sm" variant="outline">
                          <Eye className="h-3 w-3 mr-1" />
                          Details
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Upcoming Interviews */}
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-green-600" />
                <span>Upcoming Interviews</span>
              </CardTitle>
              <CardDescription>Your scheduled interview sessions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingInterviews.map((interview) => (
                  <div key={interview.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors border-gray-200">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-green-100 to-blue-100 rounded-full flex items-center justify-center">
                          {interview.type === 'AI Interview' ? (
                            <Brain className="h-5 w-5 text-green-600" />
                          ) : (
                            <Video className="h-5 w-5 text-blue-600" />
                          )}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{interview.jobTitle}</h3>
                          <p className="text-sm text-gray-600">{interview.company}</p>
                        </div>
                      </div>
                      <Badge className={getStatusColor(interview.status)}>
                        {interview.status}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center space-x-4 text-sm text-gray-600 mb-1">
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-3 w-3" />
                            <span>{interview.date}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="h-3 w-3" />
                            <span>{interview.time}</span>
                          </div>
                          <span>({interview.duration})</span>
                        </div>
                        <p className="text-xs text-gray-500">With {interview.recruiterName}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className="text-xs">
                          {interview.type}
                        </Badge>
                        <Button 
                          size="sm"
                          onClick={() => joinInterview(interview.link)}
                          className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                        >
                          <Play className="h-3 w-3 mr-1" />
                          Join
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Screening Assessments */}
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Mic className="h-5 w-5 text-purple-600" />
                <span>Screening Assessments</span>
              </CardTitle>
              <CardDescription>Your AI voice screening results</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {screeningAssessments.map((assessment) => (
                  <div key={assessment.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors border-gray-200">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">{assessment.jobTitle}</h3>
                        <p className="text-sm text-gray-600 mb-2">{assessment.company}</p>
                        <Badge className={getStatusColor(assessment.status)}>
                          {assessment.status.toUpperCase()}
                        </Badge>
                      </div>
                      {assessment.score && (
                        <div className="text-right ml-4">
                          <div className="flex items-center space-x-1 mb-1">
                            <Zap className="h-4 w-4 text-purple-500" />
                            <span className={`font-bold text-lg ${getMatchScoreColor(assessment.score)}`}>
                              {assessment.score}
                            </span>
                          </div>
                          <p className="text-xs text-gray-500">AI Score</p>
                        </div>
                      )}
                    </div>
                    {assessment.status === 'completed' ? (
                      <div>
                        <p className="text-sm text-gray-700 mb-2">{assessment.feedback}</p>
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <div className="flex items-center space-x-4">
                            <span>Duration: {assessment.duration}</span>
                            <span>Questions: {assessment.questionsAnswered}</span>
                            <span>Completed: {assessment.completedDate}</span>
                          </div>
                          <Button size="sm" variant="outline">
                            <Download className="h-3 w-3 mr-1" />
                            Report
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-orange-600">Screening pending - complete to improve your application</p>
                        <Button 
                          size="sm"
                          onClick={() => startAIScreening(assessment.id)}
                          className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                        >
                          <Mic className="h-3 w-3 mr-1" />
                          Start
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Resume Upload Section */}
        <Card className="shadow-lg border-0 bg-gradient-to-r from-blue-50 to-purple-50 mb-8">
          <CardContent className="p-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
                  <FileText className="h-8 w-8 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Update Your Resume</h3>
                  <p className="text-gray-600 mb-4">
                    Keep your resume current to get better job matches and higher AI scores.
                  </p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <CheckCircle className="h-4 w-4" />
                      <span>AI-powered parsing</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Zap className="h-4 w-4" />
                      <span>Instant analysis</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Target className="h-4 w-4" />
                      <span>Skill matching</span>
                    </div>
                  </div>
                </div>
              </div>
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                <Upload className="h-5 w-5 mr-2" />
                Upload Resume
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* AI Screening CTA */}
        <Card className="shadow-lg border-0 bg-gradient-to-r from-purple-50 to-green-50">
          <CardContent className="p-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-100 to-green-100 rounded-full flex items-center justify-center">
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
                      <Brain className="h-4 w-4" />
                      <span>AI-powered</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <CheckCircle className="h-4 w-4" />
                      <span>Instant feedback</span>
                    </div>
                  </div>
                </div>
              </div>
              <Button size="lg" className="bg-gradient-to-r from-purple-600 to-green-600 hover:from-purple-700 hover:to-green-700">
                <Play className="h-5 w-5 mr-2" />
                Start Screening
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}