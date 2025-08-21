"use client"

import React, { useState, useEffect } from 'react'
import { Mic, Play, Pause, StopCircle, Users, MessageSquare, Volume2, Settings } from 'lucide-react'
import Link from 'next/link'

interface Message {
  id: number
  sender: 'ai' | 'candidate'
  text: string
  timestamp: Date
}

export default function VoiceAIScreeningPage() {
  const [isRecording, setIsRecording] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [candidateName, setCandidateName] = useState('')
  const [messages, setMessages] = useState<Message[]>([])
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [screeningScore, setScreeningScore] = useState(0)

  const screeningQuestions = [
    "Tell me about your experience with project management.",
    "How do you handle tight deadlines and pressure?",
    "Describe a challenging problem you solved recently.",
    "What are your salary expectations for this role?",
    "Why are you interested in joining our company?"
  ]

  const aiResponses = [
    "That's very interesting. Can you elaborate on your specific role in that project?",
    "I understand. How do you prioritize tasks when everything seems urgent?",
    "That's a great example. What was your thought process?",
    "Thank you for sharing that. What factors did you consider?",
    "Excellent. What aspects of our company culture appeal to you most?"
  ]

  useEffect(() => {
    if (isRecording && !isPaused) {
      const timer = setTimeout(() => {
        if (currentQuestion < screeningQuestions.length) {
          // AI asks a question
          const aiMessage: Message = {
            id: Date.now(),
            sender: 'ai',
            text: screeningQuestions[currentQuestion],
            timestamp: new Date()
          }
          setMessages(prev => [...prev, aiMessage])
          setCurrentQuestion(prev => prev + 1)
        } else {
          // Screening complete
          setIsRecording(false)
          const finalScore = Math.floor(Math.random() * 30) + 70 // Random score between 70-100
          setScreeningScore(finalScore)
        }
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [isRecording, isPaused, currentQuestion, messages.length])

  const handleStartScreening = () => {
    if (!candidateName.trim()) {
      alert('Please enter the candidate name')
      return
    }
    
    setIsRecording(true)
    setIsPaused(false)
    setMessages([])
    setCurrentQuestion(0)
    setScreeningScore(0)
    
    // Initial AI greeting
    const greeting: Message = {
      id: Date.now(),
      sender: 'ai',
      text: `Hello ${candidateName}, welcome to your AI screening interview. I'll be asking you a few questions to better understand your background and experience. Are you ready to begin?`,
      timestamp: new Date()
    }
    setMessages([greeting])
  }

  const handlePauseResume = () => {
    setIsPaused(!isPaused)
  }

  const handleStopScreening = () => {
    setIsRecording(false)
    setIsPaused(false)
  }

  const handleCandidateResponse = () => {
    if (!isRecording || isPaused) return

    // Simulate candidate response
    const candidateResponses = [
      "I have 5 years of experience managing software development projects using Agile methodologies.",
      "I prioritize tasks based on impact and urgency, and I'm comfortable working under pressure.",
      "I recently optimized a database query that improved performance by 300%.",
      "I'm looking for a competitive salary in the range of $80,000 to $100,000.",
      "I'm excited about your company's innovative approach and growth opportunities."
    ]

    const response: Message = {
      id: Date.now(),
      sender: 'candidate',
      text: candidateResponses[Math.floor(Math.random() * candidateResponses.length)],
      timestamp: new Date()
    }
    setMessages(prev => [...prev, response])
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link href="/dashboard" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4">
            ← Back to Dashboard
          </Link>
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg">
              <Mic className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Voice AI Screening</h1>
          </div>
          <p className="text-gray-600">Conduct initial candidate screenings with intelligent voice bots that adapt to responses.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Control Panel */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <Settings className="mr-2 text-purple-600" />
                Screening Controls
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Candidate Name
                  </label>
                  <input
                    type="text"
                    value={candidateName}
                    onChange={(e) => setCandidateName(e.target.value)}
                    placeholder="Enter candidate name"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                    disabled={isRecording}
                  />
                </div>

                <div className="space-y-3">
                  {!isRecording ? (
                    <button
                      onClick={handleStartScreening}
                      disabled={!candidateName.trim()}
                      className={`w-full flex items-center justify-center p-3 rounded-lg font-semibold transition-colors ${
                        !candidateName.trim()
                          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          : 'bg-green-600 text-white hover:bg-green-700'
                      }`}
                    >
                      <Play className="mr-2 h-5 w-5" />
                      Start Screening
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={handlePauseResume}
                        className="w-full flex items-center justify-center p-3 rounded-lg font-semibold bg-yellow-600 text-white hover:bg-yellow-700 transition-colors"
                      >
                        {isPaused ? <Play className="mr-2 h-5 w-5" /> : <Pause className="mr-2 h-5 w-5" />}
                        {isPaused ? 'Resume' : 'Pause'}
                      </button>
                      <button
                        onClick={handleStopScreening}
                        className="w-full flex items-center justify-center p-3 rounded-lg font-semibold bg-red-600 text-white hover:bg-red-700 transition-colors"
                      >
                        <StopCircle className="mr-2 h-5 w-5" />
                        Stop Screening
                      </button>
                    </>
                  )}
                </div>

                {/* Screening Progress */}
                {isRecording && (
                  <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-2">Screening Progress</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Questions Completed</span>
                        <span>{currentQuestion}/{screeningQuestions.length}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${(currentQuestion / screeningQuestions.length) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Screening Score */}
                {screeningScore > 0 && (
                  <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-2">Screening Complete</h3>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-600 mb-1">{screeningScore}%</div>
                      <div className="text-sm text-gray-600">Overall Score</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Conversation Area */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                  <MessageSquare className="mr-2 text-blue-600" />
                  Live Conversation
                </h2>
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${isRecording ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></div>
                  <span className="text-sm text-gray-600">
                    {isRecording ? (isPaused ? 'Paused' : 'Recording') : 'Idle'}
                  </span>
                </div>
              </div>

              {/* Messages */}
              <div className="border border-gray-200 rounded-lg p-4 h-96 overflow-y-auto mb-4">
                {messages.length === 0 ? (
                  <div className="flex items-center justify-center h-full text-gray-500">
                    <div className="text-center">
                      <Mic className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                      <p>Start the screening to begin the conversation</p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.sender === 'ai' ? 'justify-start' : 'justify-end'}`}
                      >
                        <div
                          className={`max-w-xs lg:max-w-md p-3 rounded-lg ${
                            message.sender === 'ai'
                              ? 'bg-purple-100 text-gray-900'
                              : 'bg-blue-600 text-white'
                          }`}
                        >
                          <div className="flex items-center mb-1">
                            {message.sender === 'ai' ? (
                              <Volume2 className="h-4 w-4 mr-2 text-purple-600" />
                            ) : (
                              <Users className="h-4 w-4 mr-2" />
                            )}
                            <span className="text-xs font-medium">
                              {message.sender === 'ai' ? 'AI Interviewer' : candidateName}
                            </span>
                          </div>
                          <p className="text-sm">{message.text}</p>
                          <p className="text-xs opacity-70 mt-1">
                            {message.timestamp.toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Quick Actions */}
              {isRecording && !isPaused && (
                <div className="flex justify-center">
                  <button
                    onClick={handleCandidateResponse}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                  >
                    <Users className="mr-2 h-4 w-4" />
                    Simulate Candidate Response
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
