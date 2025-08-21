"use client"

import React, { useState, useEffect } from 'react'
import { BarChart3, TrendingUp, User, Star, Filter, Search, Award, Target } from 'lucide-react'
import Link from 'next/link'

interface Candidate {
  id: number
  name: string
  score: number
  skills: string[]
  experience: string
  lastActivity: string
  status: 'New' | 'Reviewed' | 'Interviewed' | 'Hired'
  matchPercentage: number
  skillsMatch: number
  experienceMatch: number
  communicationScore: number
}

const initialCandidates: Candidate[] = [
  { 
    id: 1, 
    name: 'Alice Johnson', 
    score: 92, 
    skills: ['React', 'Node.js', 'AWS'], 
    experience: '5 years', 
    lastActivity: '2 days ago', 
    status: 'New',
    matchPercentage: 95,
    skillsMatch: 90,
    experienceMatch: 85,
    communicationScore: 88
  },
  { 
    id: 2, 
    name: 'Bob Williams', 
    score: 88, 
    skills: ['Python', 'Django', 'SQL'], 
    experience: '7 years', 
    lastActivity: '1 week ago', 
    status: 'Reviewed',
    matchPercentage: 87,
    skillsMatch: 85,
    experienceMatch: 90,
    communicationScore: 82
  },
  { 
    id: 3, 
    name: 'Charlie Brown', 
    score: 75, 
    skills: ['Java', 'Spring', 'Microservices'], 
    experience: '3 years', 
    lastActivity: '3 days ago', 
    status: 'New',
    matchPercentage: 78,
    skillsMatch: 75,
    experienceMatch: 70,
    communicationScore: 80
  },
  { 
    id: 4, 
    name: 'Diana Prince', 
    score: 95, 
    skills: ['Vue.js', 'TypeScript', 'GraphQL'], 
    experience: '6 years', 
    lastActivity: '5 days ago', 
    status: 'Interviewed',
    matchPercentage: 98,
    skillsMatch: 95,
    experienceMatch: 92,
    communicationScore: 95
  },
  { 
    id: 5, 
    name: 'Eve Adams', 
    score: 80, 
    skills: ['C++', 'Algorithms', 'Data Structures'], 
    experience: '4 years', 
    lastActivity: '1 day ago', 
    status: 'New',
    matchPercentage: 82,
    skillsMatch: 80,
    experienceMatch: 78,
    communicationScore: 85
  },
]

export default function IntelligentRankingPage() {
  const [candidates, setCandidates] = useState<Candidate[]>(initialCandidates)
  const [filter, setFilter] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')
  const [isRecalculating, setIsRecalculating] = useState(false)
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null)

  const filteredCandidates = candidates.filter(candidate => {
    const matchesFilter = filter === 'All' || candidate.status === filter
    const matchesSearch = candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          candidate.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
    return matchesFilter && matchesSearch
  }).sort((a, b) => b.score - a.score)

  const handleRecalculateScores = () => {
    setIsRecalculating(true)
    
    // Simulate AI recalculation
    setTimeout(() => {
      setCandidates(prev => prev.map(candidate => ({
        ...candidate,
        score: Math.floor(Math.random() * 20) + 75, // Random score between 75-95
        matchPercentage: Math.floor(Math.random() * 20) + 75,
        skillsMatch: Math.floor(Math.random() * 20) + 70,
        experienceMatch: Math.floor(Math.random() * 20) + 70,
        communicationScore: Math.floor(Math.random() * 20) + 75
      })))
      setIsRecalculating(false)
    }, 2000)
  }

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600'
    if (score >= 80) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getScoreBgColor = (score: number) => {
    if (score >= 90) return 'bg-green-100'
    if (score >= 80) return 'bg-yellow-100'
    return 'bg-red-100'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link href="/dashboard" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4">
            ← Back to Dashboard
          </Link>
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-gradient-to-r from-orange-600 to-red-600 rounded-lg">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Intelligent Ranking</h1>
          </div>
          <p className="text-gray-600">Automatically score and rank candidates based on multiple assessment criteria.</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Candidates</p>
                <p className="text-2xl font-bold text-gray-900">{candidates.length}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <User className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Average Score</p>
                <p className="text-2xl font-bold text-gray-900">
                  {Math.round(candidates.reduce((acc, c) => acc + c.score, 0) / candidates.length)}
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <Award className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Top Performers</p>
                <p className="text-2xl font-bold text-gray-900">
                  {candidates.filter(c => c.score >= 90).length}
                </p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-lg">
                <Star className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Match Rate</p>
                <p className="text-2xl font-bold text-gray-900">
                  {Math.round(candidates.reduce((acc, c) => acc + c.matchPercentage, 0) / candidates.length)}%
                </p>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg">
                <Target className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 md:space-x-4">
            <div className="relative w-full md:w-1/3">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search candidates by name or skill..."
                className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="relative w-full md:w-1/3">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <select
                className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500 appearance-none bg-white"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="All">All Statuses</option>
                <option value="New">New</option>
                <option value="Reviewed">Reviewed</option>
                <option value="Interviewed">Interviewed</option>
                <option value="Hired">Hired</option>
              </select>
            </div>
            <button
              onClick={handleRecalculateScores}
              disabled={isRecalculating}
              className={`w-full md:w-auto flex items-center justify-center px-6 py-3 rounded-lg font-semibold transition-colors ${
                isRecalculating
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-orange-600 text-white hover:bg-orange-700'
              }`}
            >
              {isRecalculating ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Recalculating...
                </>
              ) : (
                <>
                  <BarChart3 className="mr-2 h-5 w-5" />
                  Recalculate Scores
                </>
              )}
            </button>
          </div>
        </div>

        {/* Candidates Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="py-4 px-6 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                    Rank
                  </th>
                  <th className="py-4 px-6 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                    Candidate
                  </th>
                  <th className="py-4 px-6 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                    Overall Score
                  </th>
                  <th className="py-4 px-6 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                    Match %
                  </th>
                  <th className="py-4 px-6 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                    Skills
                  </th>
                  <th className="py-4 px-6 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                    Experience
                  </th>
                  <th className="py-4 px-6 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="py-4 px-6 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredCandidates.map((candidate, index) => (
                  <tr 
                    key={candidate.id} 
                    className="hover:bg-gray-50 cursor-pointer"
                    onClick={() => setSelectedCandidate(candidate)}
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center">
                        <span className={`text-lg font-bold ${index < 3 ? 'text-yellow-600' : 'text-gray-400'}`}>
                          #{index + 1}
                        </span>
                        {index < 3 && <Award className="h-4 w-4 text-yellow-600 ml-1" />}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                          {candidate.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{candidate.name}</div>
                          <div className="text-sm text-gray-500">{candidate.experience} experience</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center">
                        <span className={`text-xl font-bold ${getScoreColor(candidate.score)}`}>
                          {candidate.score}
                        </span>
                        <Star className="h-5 w-5 text-yellow-400 fill-yellow-400 ml-1" />
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center">
                        <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                          <div 
                            className="bg-green-600 h-2 rounded-full"
                            style={{ width: `${candidate.matchPercentage}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium text-gray-900">{candidate.matchPercentage}%</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex flex-wrap gap-1">
                        {candidate.skills.slice(0, 2).map(skill => (
                          <span key={skill} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                            {skill}
                          </span>
                        ))}
                        {candidate.skills.length > 2 && (
                          <span className="text-xs text-gray-500">+{candidate.skills.length - 2}</span>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-900">{candidate.experience}</td>
                    <td className="py-4 px-6">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        candidate.status === 'New' ? 'bg-blue-100 text-blue-800' :
                        candidate.status === 'Reviewed' ? 'bg-purple-100 text-purple-800' :
                        candidate.status === 'Interviewed' ? 'bg-green-100 text-green-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {candidate.status}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex space-x-2">
                        <button className="text-orange-600 hover:text-orange-800 font-medium text-sm">
                          View Details
                        </button>
                        <button className="text-blue-600 hover:text-blue-800 font-medium text-sm">
                          Schedule
                        </button>
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
            <div className="bg-white rounded-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Candidate Details</h2>
                  <button
                    onClick={() => setSelectedCandidate(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ✕
                  </button>
                </div>
                
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white font-semibold text-xl">
                      {selectedCandidate.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{selectedCandidate.name}</h3>
                      <p className="text-gray-600">{selectedCandidate.experience} experience</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-2">Overall Score</h4>
                      <div className="text-3xl font-bold text-orange-600">{selectedCandidate.score}</div>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-2">Match Percentage</h4>
                      <div className="text-3xl font-bold text-green-600">{selectedCandidate.matchPercentage}%</div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Detailed Scores</h4>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Skills Match</span>
                          <span>{selectedCandidate.skillsMatch}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${selectedCandidate.skillsMatch}%` }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Experience Match</span>
                          <span>{selectedCandidate.experienceMatch}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-green-600 h-2 rounded-full" style={{ width: `${selectedCandidate.experienceMatch}%` }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Communication</span>
                          <span>{selectedCandidate.communicationScore}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-purple-600 h-2 rounded-full" style={{ width: `${selectedCandidate.communicationScore}%` }}></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedCandidate.skills.map(skill => (
                        <span key={skill} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex space-x-3">
                    <button className="flex-1 bg-orange-600 text-white py-2 px-4 rounded-lg hover:bg-orange-700 transition-colors">
                      Schedule Interview
                    </button>
                    <button className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors">
                      View Resume
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
