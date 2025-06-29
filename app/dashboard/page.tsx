"use client"

import { useState } from 'react'
import { useUser, UserButton } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { 
  Users, 
  Briefcase, 
  Calendar, 
  TrendingUp, 
  Plus,
  Eye,
  Clock,
  CheckCircle,
  XCircle,
  Star,
  Search,
  Filter,
  Download,
  Settings,
  LogOut,
  Brain,
  MoreVertical,
  Edit,
  Trash2,
  Play,
  Pause,
  BarChart3,
  Target,
  Zap
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import Link from 'next/link'
import RoleRedirect from '@/components/navigation/role-redirect'

export default function RecruiterDashboard() {
  const { user, isLoaded } = useUser()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('overview')
  const [searchTerm, setSearchTerm] = useState('')

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!user) {
    router.push('/recruiter/signin')
    return null
  }

  // Mock data
  const stats = {
    totalJobs: 12,
    activeCandidates: 48,
    scheduledInterviews: 8,
    hiredThisMonth: 5,
    avgTimeToHire: 14,
    successRate: 85
  }

  const recentJobs = [
    {
      id: '1',
      title: 'Senior Frontend Developer',
      company: 'TechCorp',
      applicants: 23,
      status: 'active',
      createdAt: '2024-01-15',
      screeningLink: 'https://recruitai.com/screening/job-1',
      views: 156,
      conversion: 14.7
    },
    {
      id: '2',
      title: 'Product Manager',
      company: 'TechCorp',
      applicants: 15,
      status: 'active',
      createdAt: '2024-01-14',
      screeningLink: 'https://recruitai.com/screening/job-2',
      views: 89,
      conversion: 16.9
    },
    {
      id: '3',
      title: 'Data Scientist',
      company: 'TechCorp',
      applicants: 31,
      status: 'paused',
      createdAt: '2024-01-12',
      screeningLink: 'https://recruitai.com/screening/job-3',
      views: 203,
      conversion: 15.3
    }
  ]

  const topCandidates = [
    {
      id: '1',
      name: 'Sarah Johnson',
      position: 'Senior Frontend Developer',
      score: 92,
      status: 'interviewed',
      avatar: 'SJ',
      resumeScore: 88,
      screeningScore: 95,
      appliedAt: '2024-01-18',
      skills: ['React', 'TypeScript', 'Node.js'],
      experience: '5+ years'
    },
    {
      id: '2',
      name: 'Michael Chen',
      position: 'Product Manager',
      score: 88,
      status: 'screening',
      avatar: 'MC',
      resumeScore: 85,
      screeningScore: 90,
      appliedAt: '2024-01-17',
      skills: ['Product Strategy', 'Analytics', 'Agile'],
      experience: '4+ years'
    },
    {
      id: '3',
      name: 'Emily Rodriguez',
      position: 'Data Scientist',
      score: 85,
      status: 'applied',
      avatar: 'ER',
      resumeScore: 90,
      screeningScore: 82,
      appliedAt: '2024-01-16',
      skills: ['Python', 'Machine Learning', 'SQL'],
      experience: '3+ years'
    }
  ]

  const upcomingInterviews = [
    {
      id: '1',
      candidate: 'Sarah Johnson',
      position: 'Senior Frontend Developer',
      time: '2024-01-20 10:00 AM',
      type: 'AI Interview',
      status: 'scheduled',
      duration: '45 min'
    },
    {
      id: '2',
      candidate: 'David Kim',
      position: 'Product Manager',
      time: '2024-01-20 2:00 PM',
      type: 'Technical Interview',
      status: 'scheduled',
      duration: '60 min'
    }
  ]

  const handleCreateJob = () => {
    router.push('/jobs/create')
  }

  const handleCreateInterview = () => {
    router.push('/interviews/create')
  }

  const handleJobAction = (action: string, jobId: string) => {
    console.log(`${action} job ${jobId}`)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200'
      case 'paused': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'closed': return 'bg-gray-100 text-gray-800 border-gray-200'
      case 'interviewed': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'screening': return 'bg-purple-100 text-purple-800 border-purple-200'
      case 'applied': return 'bg-orange-100 text-orange-800 border-orange-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600'
    if (score >= 80) return 'text-blue-600'
    if (score >= 70) return 'text-yellow-600'
    return 'text-red-600'
  }

  return (
    <>
      <RoleRedirect requiredRole="recruiter" />
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white border-b sticky top-0 z-50 shadow-sm">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Brain className="h-8 w-8 text-blue-600" />
                  <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    RecruitAI
                  </span>
                </div>
                <div className="hidden md:block h-6 w-px bg-gray-300" />
                <div className="hidden md:block">
                  <h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>
                  <p className="text-sm text-gray-600">Welcome back, {user.firstName || user.emailAddresses[0].emailAddress}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="relative hidden md:block">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search jobs, candidates..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-64 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                
                <Button onClick={handleCreateJob} className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-md">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Job
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
          {/* Quick Actions */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Button 
                variant="outline" 
                className="h-auto p-4 flex flex-col items-center space-y-2 hover:bg-blue-50 hover:border-blue-200"
                onClick={handleCreateJob}
              >
                <Plus className="h-6 w-6 text-blue-600" />
                <span className="text-sm font-medium">Create Job</span>
              </Button>
              <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2 hover:bg-purple-50 hover:border-purple-200">
                <Users className="h-6 w-6 text-purple-600" />
                <span className="text-sm font-medium">View Candidates</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-auto p-4 flex flex-col items-center space-y-2 hover:bg-green-50 hover:border-green-200"
                onClick={handleCreateInterview}
              >
                <Calendar className="h-6 w-6 text-green-600" />
                <span className="text-sm font-medium">Schedule Interview</span>
              </Button>
              <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2 hover:bg-orange-50 hover:border-orange-200">
                <BarChart3 className="h-6 w-6 text-orange-600" />
                <span className="text-sm font-medium">View Analytics</span>
              </Button>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
            <Card className="hover:shadow-lg transition-all duration-200 border-0 shadow-md">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Total Jobs</CardTitle>
                <Briefcase className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{stats.totalJobs}</div>
                <p className="text-xs text-green-600 font-medium">
                  +2 from last month
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-200 border-0 shadow-md">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Active Candidates</CardTitle>
                <Users className="h-4 w-4 text-purple-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{stats.activeCandidates}</div>
                <p className="text-xs text-green-600 font-medium">
                  +12 from last week
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-200 border-0 shadow-md">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Interviews</CardTitle>
                <Calendar className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{stats.scheduledInterviews}</div>
                <p className="text-xs text-blue-600 font-medium">
                  Next: Today 10:00 AM
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-200 border-0 shadow-md">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Hired</CardTitle>
                <TrendingUp className="h-4 w-4 text-orange-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{stats.hiredThisMonth}</div>
                <p className="text-xs text-green-600 font-medium">
                  +25% from last month
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-200 border-0 shadow-md">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Avg. Time to Hire</CardTitle>
                <Clock className="h-4 w-4 text-red-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{stats.avgTimeToHire}d</div>
                <p className="text-xs text-green-600 font-medium">
                  -3 days improved
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-200 border-0 shadow-md">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Success Rate</CardTitle>
                <Target className="h-4 w-4 text-indigo-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{stats.successRate}%</div>
                <p className="text-xs text-green-600 font-medium">
                  +5% improvement
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Recent Jobs */}
            <Card className="shadow-md border-0">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="flex items-center space-x-2">
                    <Briefcase className="h-5 w-5 text-blue-600" />
                    <span>Recent Jobs</span>
                  </CardTitle>
                  <CardDescription>Your latest job postings and their performance</CardDescription>
                </div>
                <Button variant="outline" size="sm" className="border-gray-200">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentJobs.map((job) => (
                    <div key={job.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors border-gray-200">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="font-semibold text-gray-900">{job.title}</h3>
                          <Badge className={getStatusColor(job.status)}>
                            {job.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{job.company}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span className="flex items-center space-x-1">
                            <Users className="h-3 w-3" />
                            <span>{job.applicants} applicants</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <Eye className="h-3 w-3" />
                            <span>{job.views} views</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <TrendingUp className="h-3 w-3" />
                            <span>{job.conversion}% conversion</span>
                          </span>
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleJobAction('view', job.id)}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleJobAction('edit', job.id)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Job
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleJobAction(job.status === 'active' ? 'pause' : 'activate', job.id)}>
                            {job.status === 'active' ? (
                              <>
                                <Pause className="mr-2 h-4 w-4" />
                                Pause Job
                              </>
                            ) : (
                              <>
                                <Play className="mr-2 h-4 w-4" />
                                Activate Job
                              </>
                            )}
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => handleJobAction('delete', job.id)} className="text-red-600">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete Job
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Top Candidates */}
            <Card className="shadow-md border-0">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="flex items-center space-x-2">
                    <Star className="h-5 w-5 text-yellow-500" />
                    <span>Top Candidates</span>
                  </CardTitle>
                  <CardDescription>Highest scoring candidates across all positions</CardDescription>
                </div>
                <Button variant="outline" size="sm" className="border-gray-200">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topCandidates.map((candidate, index) => (
                    <div key={candidate.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors border-gray-200">
                      <div className="flex items-center space-x-3">
                        <div className="relative">
                          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                            {candidate.avatar}
                          </div>
                          <div className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center text-xs font-bold text-white">
                            {index + 1}
                          </div>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">{candidate.name}</h3>
                          <p className="text-sm text-gray-600">{candidate.position}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge className={getStatusColor(candidate.status)}>
                              {candidate.status}
                            </Badge>
                            <span className="text-xs text-gray-500">{candidate.experience}</span>
                          </div>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {candidate.skills.slice(0, 3).map((skill) => (
                              <span key={skill} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="text-right">
                          <div className="flex items-center space-x-1">
                            <Zap className="h-4 w-4 text-yellow-500" />
                            <span className={`font-bold text-lg ${getScoreColor(candidate.score)}`}>
                              {candidate.score}
                            </span>
                          </div>
                          <div className="text-xs text-gray-500">
                            R:{candidate.resumeScore} S:{candidate.screeningScore}
                          </div>
                        </div>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Upcoming Interviews */}
          <Card className="shadow-md border-0">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-green-600" />
                <span>Upcoming Interviews</span>
              </CardTitle>
              <CardDescription>Scheduled interviews for today and tomorrow</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingInterviews.map((interview) => (
                  <div key={interview.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors border-gray-200">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-green-100 to-blue-100 rounded-full flex items-center justify-center">
                        <Calendar className="h-6 w-6 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{interview.candidate}</h3>
                        <p className="text-sm text-gray-600">{interview.position}</p>
                        <div className="flex items-center space-x-4 mt-1">
                          <div className="flex items-center space-x-1 text-sm text-gray-500">
                            <Clock className="h-4 w-4" />
                            <span>{interview.time}</span>
                          </div>
                          <span className="text-sm text-gray-500">({interview.duration})</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Badge variant="outline" className="border-blue-200 text-blue-700">
                        {interview.type}
                      </Badge>
                      <Button size="sm" className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700">
                        Join Interview
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}