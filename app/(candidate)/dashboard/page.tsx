"use client"

import { useState } from 'react'
import { useUser, UserButton } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { 
  User,
  Briefcase, 
  Calendar, 
  TrendingUp, 
  Search,
  Eye,
  Clock,
  CheckCircle,
  XCircle,
  Star,
  Brain,
  FileText,
  Mic,
  MapPin,
  Building,
  DollarSign
} from 'lucide-react'

export default function CandidateDashboard() {
  const { user, isLoaded } = useUser()
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
      </div>
    )
  }

  if (!user) {
    router.push('/signin-candidate')
    return null
  }

  // Mock data
  const stats = {
    totalApplications: 8,
    activeApplications: 5,
    interviewsScheduled: 2,
    offersReceived: 1
  }

  const applications = [
    {
      id: '1',
      jobTitle: 'Senior Frontend Developer',
      company: 'TechCorp',
      location: 'San Francisco, CA',
      salary: '$120k - $160k',
      status: 'interviewed',
      appliedAt: '2024-01-18',
      stage: 'Final Interview',
      progress: 75
    },
    {
      id: '2',
      jobTitle: 'Product Manager',
      company: 'StartupXYZ',
      location: 'Remote',
      salary: '$100k - $140k',
      status: 'screening',
      appliedAt: '2024-01-17',
      stage: 'AI Screening',
      progress: 50
    },
    {
      id: '3',
      jobTitle: 'Data Scientist',
      company: 'DataCorp',
      location: 'New York, NY',
      salary: '$110k - $150k',
      status: 'applied',
      appliedAt: '2024-01-16',
      stage: 'Application Review',
      progress: 25
    }
  ]

  const upcomingInterviews = [
    {
      id: '1',
      jobTitle: 'Senior Frontend Developer',
      company: 'TechCorp',
      time: '2024-01-20 10:00 AM',
      type: 'Technical Interview',
      interviewer: 'Sarah Johnson',
      duration: '60 min'
    },
    {
      id: '2',
      jobTitle: 'Product Manager',
      company: 'StartupXYZ',
      time: '2024-01-21 2:00 PM',
      type: 'AI Interview',
      interviewer: 'AI Assistant',
      duration: '30 min'
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'interviewed': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'screening': return 'bg-purple-100 text-purple-800 border-purple-200'
      case 'applied': return 'bg-orange-100 text-orange-800 border-orange-200'
      case 'offered': return 'bg-green-100 text-green-800 border-green-200'
      case 'rejected': return 'bg-red-100 text-red-800 border-red-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  return (
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
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="hover:shadow-lg transition-all duration-200 border-0 shadow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Applications</CardTitle>
              <Briefcase className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{stats.totalApplications}</div>
              <p className="text-xs text-green-600 font-medium">
                +2 this week
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-200 border-0 shadow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Active Applications</CardTitle>
              <TrendingUp className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{stats.activeApplications}</div>
              <p className="text-xs text-blue-600 font-medium">
                In progress
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-200 border-0 shadow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Interviews</CardTitle>
              <Calendar className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{stats.interviewsScheduled}</div>
              <p className="text-xs text-purple-600 font-medium">
                Next: Today 10:00 AM
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-200 border-0 shadow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Offers</CardTitle>
              <Star className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{stats.offersReceived}</div>
              <p className="text-xs text-yellow-600 font-medium">
                Pending response
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* My Applications */}
          <Card className="shadow-md border-0">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Briefcase className="h-5 w-5 text-green-600" />
                <span>My Applications</span>
              </CardTitle>
              <CardDescription>Track your job application progress</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {applications.map((app) => (
                  <div key={app.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">{app.jobTitle}</h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                          <div className="flex items-center space-x-1">
                            <Building className="h-3 w-3" />
                            <span>{app.company}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MapPin className="h-3 w-3" />
                            <span>{app.location}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <DollarSign className="h-3 w-3" />
                            <span>{app.salary}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className={getStatusColor(app.status)}>
                            {app.stage}
                          </Badge>
                          <span className="text-xs text-gray-500">Applied {app.appliedAt}</span>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-green-600 to-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${app.progress}%` }}
                      />
                    </div>
                    <div className="text-xs text-gray-500 mt-1">{app.progress}% complete</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Interviews */}
          <Card className="shadow-md border-0">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-purple-600" />
                <span>Upcoming Interviews</span>
              </CardTitle>
              <CardDescription>Your scheduled interviews</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingInterviews.map((interview) => (
                  <div key={interview.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full flex items-center justify-center">
                          {interview.type === 'AI Interview' ? (
                            <Brain className="h-5 w-5 text-purple-600" />
                          ) : (
                            <User className="h-5 w-5 text-blue-600" />
                          )}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{interview.jobTitle}</h3>
                          <p className="text-sm text-gray-600">{interview.company}</p>
                          <div className="flex items-center space-x-4 mt-1">
                            <div className="flex items-center space-x-1 text-sm text-gray-500">
                              <Clock className="h-3 w-3" />
                              <span>{interview.time}</span>
                            </div>
                            <span className="text-sm text-gray-500">({interview.duration})</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant="outline" className="border-purple-200 text-purple-700 mb-2">
                          {interview.type}
                        </Badge>
                        <div className="text-xs text-gray-500">
                          with {interview.interviewer}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="shadow-md border-0">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks and tools</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2 hover:bg-green-50 hover:border-green-200">
                <Search className="h-6 w-6 text-green-600" />
                <span className="text-sm font-medium">Browse Jobs</span>
              </Button>
              <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2 hover:bg-blue-50 hover:border-blue-200">
                <FileText className="h-6 w-6 text-blue-600" />
                <span className="text-sm font-medium">Update Resume</span>
              </Button>
              <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2 hover:bg-purple-50 hover:border-purple-200">
                <Mic className="h-6 w-6 text-purple-600" />
                <span className="text-sm font-medium">Practice Interview</span>
              </Button>
              <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2 hover:bg-orange-50 hover:border-orange-200">
                <TrendingUp className="h-6 w-6 text-orange-600" />
                <span className="text-sm font-medium">View Analytics</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}