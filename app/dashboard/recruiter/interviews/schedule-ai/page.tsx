"use client"

import React, { useState } from 'react'
import { Calendar, Clock, User, Mail, CheckCircle, XCircle, Loader2, Video, MapPin, Briefcase } from 'lucide-react'
import Link from 'next/link'

interface InterviewSlot {
  id: string
  date: string
  time: string
  duration: number
  type: 'video' | 'in-person'
  available: boolean
}

interface ScheduledInterview {
  id: string
  candidateName: string
  candidateEmail: string
  jobTitle: string
  dateTime: string
  duration: number
  type: 'video' | 'in-person'
  status: 'scheduled' | 'confirmed' | 'completed' | 'cancelled'
  meetingLink?: string
  location?: string
}

export default function AIInterviewSchedulingPage() {
  const [candidateName, setCandidateName] = useState('')
  const [candidateEmail, setCandidateEmail] = useState('')
  const [jobTitle, setJobTitle] = useState('')
  const [interviewType, setInterviewType] = useState<'video' | 'in-person'>('video')
  const [duration, setDuration] = useState(30)
  const [selectedDate, setSelectedDate] = useState('')
  const [isScheduling, setIsScheduling] = useState(false)
  const [scheduleStatus, setScheduleStatus] = useState<'success' | 'error' | null>(null)
  const [scheduledInterviews, setScheduledInterviews] = useState<ScheduledInterview[]>([])

  // Generate available time slots for the next 7 days
  const generateTimeSlots = (date: string): InterviewSlot[] => {
    const slots: InterviewSlot[] = []
    const startHour = 9 // 9 AM
    const endHour = 17 // 5 PM
    
    for (let hour = startHour; hour < endHour; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`
        slots.push({
          id: `${date}-${time}`,
          date,
          time,
          duration: 30,
          type: interviewType,
          available: Math.random() > 0.3 // 70% availability
        })
      }
    }
    return slots
  }

  const availableSlots = selectedDate ? generateTimeSlots(selectedDate) : []

  const handleScheduleInterview = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!candidateName || !candidateEmail || !jobTitle || !selectedDate) {
      setScheduleStatus('error')
      return
    }

    setIsScheduling(true)
    setScheduleStatus(null)

    // Simulate API call for scheduling
    setTimeout(() => {
      if (Math.random() > 0.2) { // Simulate success 80% of the time
        const newInterview: ScheduledInterview = {
          id: Math.random().toString(36).substr(2, 9),
          candidateName,
          candidateEmail,
          jobTitle,
          dateTime: `${selectedDate}T10:00`,
          duration,
          type: interviewType,
          status: 'scheduled',
          meetingLink: interviewType === 'video' ? 'https://meet.google.com/abc-xyz-123' : undefined,
          location: interviewType === 'in-person' ? 'Conference Room A, Floor 3' : undefined
        }
        
        setScheduledInterviews(prev => [newInterview, ...prev])
        setScheduleStatus('success')
        
        // Clear form
        setCandidateName('')
        setCandidateEmail('')
        setJobTitle('')
        setSelectedDate('')
        setInterviewType('video')
        setDuration(30)
      } else {
        setScheduleStatus('error')
      }
      setIsScheduling(false)
    }, 2500)
  }

  const handleSlotSelection = (slot: InterviewSlot) => {
    if (slot.available) {
      setSelectedDate(slot.date)
      // You could also set the time here if needed
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800'
      case 'confirmed': return 'bg-green-100 text-green-800'
      case 'completed': return 'bg-gray-100 text-gray-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link href="/dashboard" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4">
            ← Back to Dashboard
          </Link>
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-gradient-to-r from-red-600 to-orange-600 rounded-lg">
              <Calendar className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">AI Interview Scheduling</h1>
          </div>
          <p className="text-gray-600">Automated interview scheduling with calendar integration and smart rescheduling.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Scheduling Form */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <Calendar className="mr-2 text-red-600" />
                Schedule New Interview
              </h2>

              <form onSubmit={handleScheduleInterview} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Candidate Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      value={candidateName}
                      onChange={(e) => setCandidateName(e.target.value)}
                      placeholder="e.g., Jane Doe"
                      className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Candidate Email *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="email"
                      value={candidateEmail}
                      onChange={(e) => setCandidateEmail(e.target.value)}
                      placeholder="e.g., jane.doe@example.com"
                      className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Job Title *
                  </label>
                  <div className="relative">
                    <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      value={jobTitle}
                      onChange={(e) => setJobTitle(e.target.value)}
                      placeholder="e.g., Senior Software Engineer"
                      className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Interview Type
                    </label>
                    <select
                      value={interviewType}
                      onChange={(e) => setInterviewType(e.target.value as 'video' | 'in-person')}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
                    >
                      <option value="video">Video Call</option>
                      <option value="in-person">In-Person</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Duration (minutes)
                    </label>
                    <select
                      value={duration}
                      onChange={(e) => setDuration(Number(e.target.value))}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
                    >
                      <option value={30}>30 minutes</option>
                      <option value={45}>45 minutes</option>
                      <option value={60}>1 hour</option>
                      <option value={90}>1.5 hours</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preferred Date *
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isScheduling}
                  className={`w-full flex items-center justify-center p-3 rounded-lg font-semibold transition-colors ${
                    isScheduling
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-gradient-to-r from-red-600 to-orange-600 text-white hover:from-red-700 hover:to-orange-700'
                  }`}
                >
                  {isScheduling ? (
                    <>
                      <Loader2 className="animate-spin mr-2 h-5 w-5" />
                      Scheduling...
                    </>
                  ) : (
                    <>
                      <Calendar className="mr-2 h-5 w-5" />
                      Schedule Interview
                    </>
                  )}
                </button>
              </form>

              {scheduleStatus === 'success' && (
                <div className="mt-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2" />
                  Interview scheduled successfully! Confirmation email sent to candidate.
                </div>
              )}
              {scheduleStatus === 'error' && (
                <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg flex items-center">
                  <XCircle className="h-5 w-5 mr-2" />
                  Failed to schedule interview. Please fill all required fields and try again.
                </div>
              )}
            </div>

            {/* Available Time Slots */}
            {selectedDate && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Clock className="mr-2 text-blue-600" />
                  Available Time Slots for {new Date(selectedDate).toLocaleDateString()}
                </h3>
                <div className="grid grid-cols-3 gap-2">
                  {availableSlots.slice(0, 12).map((slot) => (
                    <button
                      key={slot.id}
                      onClick={() => handleSlotSelection(slot)}
                      disabled={!slot.available}
                      className={`p-2 text-sm rounded-lg border transition-colors ${
                        slot.available
                          ? 'border-blue-300 text-blue-700 hover:bg-blue-50'
                          : 'border-gray-200 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      {slot.time}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Scheduled Interviews */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <Video className="mr-2 text-green-600" />
              Scheduled Interviews
            </h2>

            <div className="space-y-4">
              {scheduledInterviews.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Calendar className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>No interviews scheduled yet</p>
                </div>
              ) : (
                scheduledInterviews.map((interview) => (
                  <div key={interview.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-gray-900">{interview.candidateName}</h3>
                        <p className="text-sm text-gray-600">{interview.jobTitle}</p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(interview.status)}`}>
                        {interview.status}
                      </span>
                    </div>
                    
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2" />
                        {new Date(interview.dateTime).toLocaleDateString()} at {new Date(interview.dateTime).toLocaleTimeString()}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2" />
                        {interview.duration} minutes
                      </div>
                      <div className="flex items-center">
                        {interview.type === 'video' ? (
                          <>
                            <Video className="h-4 w-4 mr-2" />
                            Video Call
                          </>
                        ) : (
                          <>
                            <MapPin className="h-4 w-4 mr-2" />
                            {interview.location}
                          </>
                        )}
                      </div>
                    </div>

                    {interview.meetingLink && (
                      <div className="mt-3 pt-3 border-t border-gray-100">
                        <a
                          href={interview.meetingLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                        >
                          Join Meeting →
                        </a>
                      </div>
                    )}

                    <div className="mt-3 pt-3 border-t border-gray-100 flex space-x-2">
                      <button className="text-green-600 hover:text-green-700 text-sm font-medium">
                        Confirm
                      </button>
                      <button className="text-red-600 hover:text-red-700 text-sm font-medium">
                        Reschedule
                      </button>
                      <button className="text-gray-600 hover:text-gray-700 text-sm font-medium">
                        Cancel
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* AI Suggestions */}
        <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <Calendar className="mr-2 text-purple-600" />
            AI Scheduling Suggestions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
              <h3 className="font-semibold text-purple-900 mb-2">Optimal Time Slots</h3>
              <p className="text-sm text-purple-700">Based on candidate availability patterns, 10:00 AM and 2:00 PM have the highest acceptance rates.</p>
            </div>
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h3 className="font-semibold text-blue-900 mb-2">Duration Optimization</h3>
              <p className="text-sm text-blue-700">For this role, 45-minute interviews show better candidate engagement and completion rates.</p>
            </div>
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <h3 className="font-semibold text-green-900 mb-2">Follow-up Reminders</h3>
              <p className="text-sm text-green-700">Automated reminders will be sent 24 hours and 1 hour before the scheduled interview.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
