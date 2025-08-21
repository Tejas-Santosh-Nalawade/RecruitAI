"use client"

import React, { useState } from 'react'
import { Users, FileText, CheckCircle, XCircle, Plus, Search, Download, Eye, Clock, Calendar } from 'lucide-react'
import Link from 'next/link'

interface CandidateOnboarding {
  id: number
  name: string
  email: string
  jobTitle: string
  startDate: string
  status: 'Pending Forms' | 'Pending Signatures' | 'In Progress' | 'Completed' | 'Rejected'
  progress: number
  documents: { name: string; status: 'Pending' | 'Signed' | 'Uploaded' | 'Rejected' }[]
  lastActivity: string
  assignedTo: string
}

const initialOnboardingList: CandidateOnboarding[] = [
  { 
    id: 1, 
    name: 'Emily White', 
    email: 'emily.white@example.com',
    jobTitle: 'Senior Software Engineer',
    startDate: '2024-02-15',
    status: 'Pending Signatures', 
    progress: 60, 
    documents: [
      { name: 'Offer Letter', status: 'Signed' },
      { name: 'NDA', status: 'Pending' },
      { name: 'Tax Forms', status: 'Pending' },
      { name: 'Direct Deposit Form', status: 'Uploaded' }
    ],
    lastActivity: '2 hours ago',
    assignedTo: 'Sarah Johnson'
  },
  { 
    id: 2, 
    name: 'David Green', 
    email: 'david.green@example.com',
    jobTitle: 'Product Manager',
    startDate: '2024-02-20',
    status: 'Completed', 
    progress: 100, 
    documents: [
      { name: 'Offer Letter', status: 'Signed' },
      { name: 'NDA', status: 'Signed' },
      { name: 'Tax Forms', status: 'Uploaded' },
      { name: 'Direct Deposit Form', status: 'Uploaded' }
    ],
    lastActivity: '1 day ago',
    assignedTo: 'Mike Chen'
  },
  { 
    id: 3, 
    name: 'Sophia Lee', 
    email: 'sophia.lee@example.com',
    jobTitle: 'UX Designer',
    startDate: '2024-02-25',
    status: 'Pending Forms', 
    progress: 20, 
    documents: [
      { name: 'Offer Letter', status: 'Pending' }
    ],
    lastActivity: '3 days ago',
    assignedTo: 'Sarah Johnson'
  },
  { 
    id: 4, 
    name: 'Alex Rodriguez', 
    email: 'alex.rodriguez@example.com',
    jobTitle: 'Data Scientist',
    startDate: '2024-03-01',
    status: 'In Progress', 
    progress: 80, 
    documents: [
      { name: 'Offer Letter', status: 'Signed' },
      { name: 'NDA', status: 'Signed' },
      { name: 'Tax Forms', status: 'Uploaded' },
      { name: 'Direct Deposit Form', status: 'Pending' }
    ],
    lastActivity: '5 hours ago',
    assignedTo: 'Mike Chen'
  },
]

export default function DigitalOnboardingManagePage() {
  const [onboardingList, setOnboardingList] = useState<CandidateOnboarding[]>(initialOnboardingList)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [selectedCandidate, setSelectedCandidate] = useState<CandidateOnboarding | null>(null)

  const filteredList = onboardingList.filter(candidate => {
    const matchesSearch = candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          candidate.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          candidate.jobTitle.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'All' || candidate.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800'
      case 'In Progress': return 'bg-blue-100 text-blue-800'
      case 'Pending Signatures': return 'bg-yellow-100 text-yellow-800'
      case 'Pending Forms': return 'bg-orange-100 text-orange-800'
      case 'Rejected': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getDocumentStatusIcon = (status: string) => {
    switch (status) {
      case 'Signed':
      case 'Uploaded':
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'Rejected':
        return <XCircle className="h-4 w-4 text-red-500" />
      default:
        return <Clock className="h-4 w-4 text-yellow-500" />
    }
  }

  const handleSendReminder = (candidateId: number) => {
    // Simulate sending reminder
    alert(`Reminder sent to ${onboardingList.find(c => c.id === candidateId)?.name}`)
  }

  const handleMarkComplete = (candidateId: number) => {
    setOnboardingList(prev => prev.map(candidate => 
      candidate.id === candidateId 
        ? { ...candidate, status: 'Completed', progress: 100 }
        : candidate
    ))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link href="/dashboard" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4">
            ← Back to Dashboard
          </Link>
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg">
              <Users className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Digital Onboarding Management</h1>
          </div>
          <p className="text-gray-600">Streamlined onboarding with e-signatures, document management, and status tracking.</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Onboarding</p>
                <p className="text-2xl font-bold text-gray-900">{onboardingList.length}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-gray-900">
                  {onboardingList.filter(c => c.status === 'Completed').length}
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">In Progress</p>
                <p className="text-2xl font-bold text-gray-900">
                  {onboardingList.filter(c => c.status === 'In Progress' || c.status === 'Pending Signatures').length}
                </p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-lg">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-gray-900">
                  {onboardingList.filter(c => c.status === 'Pending Forms').length}
                </p>
              </div>
              <div className="p-3 bg-orange-100 rounded-lg">
                <FileText className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 md:space-x-4">
            <div className="relative w-full md:w-1/2">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search candidates by name, email, or job title..."
                className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="relative w-full md:w-1/3">
              <select
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 appearance-none bg-white"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="All">All Statuses</option>
                <option value="Pending Forms">Pending Forms</option>
                <option value="Pending Signatures">Pending Signatures</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
            <button className="w-full md:w-auto bg-indigo-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-indigo-700 transition-colors flex items-center justify-center">
              <Plus className="mr-2 h-5 w-5" />
              Add New Onboarding
            </button>
          </div>
        </div>

        {/* Onboarding Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="py-4 px-6 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                    Candidate
                  </th>
                  <th className="py-4 px-6 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                    Job Title
                  </th>
                  <th className="py-4 px-6 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                    Start Date
                  </th>
                  <th className="py-4 px-6 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="py-4 px-6 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                    Progress
                  </th>
                  <th className="py-4 px-6 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                    Last Activity
                  </th>
                  <th className="py-4 px-6 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredList.map((candidate) => (
                  <tr 
                    key={candidate.id} 
                    className="hover:bg-gray-50 cursor-pointer"
                    onClick={() => setSelectedCandidate(candidate)}
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                          {candidate.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{candidate.name}</div>
                          <div className="text-sm text-gray-500">{candidate.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-900">{candidate.jobTitle}</td>
                    <td className="py-4 px-6 text-sm text-gray-900">
                      {new Date(candidate.startDate).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-6">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(candidate.status)}`}>
                        {candidate.status}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center">
                        <div className="w-20 bg-gray-200 rounded-full h-2 mr-2">
                          <div 
                            className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${candidate.progress}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-600">{candidate.progress}%</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-500">{candidate.lastActivity}</td>
                    <td className="py-4 px-6">
                      <div className="flex space-x-2">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation()
                            handleSendReminder(candidate.id)
                          }}
                          className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                        >
                          Send Reminder
                        </button>
                        {candidate.progress === 100 && candidate.status !== 'Completed' && (
                          <button 
                            onClick={(e) => {
                              e.stopPropagation()
                              handleMarkComplete(candidate.id)
                            }}
                            className="text-green-600 hover:text-green-800 text-sm font-medium"
                          >
                            Mark Complete
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Candidate Details Modal */}
        {selectedCandidate && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl max-w-4xl w-full max-h-[80vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Onboarding Details</h2>
                  <button
                    onClick={() => setSelectedCandidate(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ✕
                  </button>
                </div>
                
                <div className="space-y-6">
                  {/* Candidate Info */}
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-xl">
                      {selectedCandidate.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{selectedCandidate.name}</h3>
                      <p className="text-gray-600">{selectedCandidate.email}</p>
                      <p className="text-sm text-gray-500">{selectedCandidate.jobTitle}</p>
                    </div>
                  </div>

                  {/* Progress Overview */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-2">Start Date</h4>
                      <div className="flex items-center">
                        <Calendar className="h-5 w-5 text-gray-500 mr-2" />
                        <span className="text-gray-700">{new Date(selectedCandidate.startDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-2">Progress</h4>
                      <div className="text-2xl font-bold text-indigo-600">{selectedCandidate.progress}%</div>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-2">Assigned To</h4>
                      <span className="text-gray-700">{selectedCandidate.assignedTo}</span>
                    </div>
                  </div>

                  {/* Documents */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-4">Required Documents</h4>
                    <div className="space-y-3">
                      {selectedCandidate.documents.map((doc, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                          <div className="flex items-center">
                            {getDocumentStatusIcon(doc.status)}
                            <span className="ml-3 font-medium text-gray-900">{doc.name}</span>
                          </div>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            doc.status === 'Signed' || doc.status === 'Uploaded' 
                              ? 'bg-green-100 text-green-800'
                              : doc.status === 'Rejected'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {doc.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-3 pt-4 border-t border-gray-200">
                    <button className="flex-1 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors">
                      Send Reminder
                    </button>
                    <button className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors">
                      View Documents
                    </button>
                    <button className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors">
                      Mark Complete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
