"use client"

import React, { useState, useCallback } from 'react'
import { Brain, UploadCloud, FileText, CheckCircle, XCircle, Download, Copy, Eye } from 'lucide-react'
import Link from 'next/link'
import { useDropzone } from 'react-dropzone'

interface ParsedData {
  name: string
  email: string
  phone: string
  experience: string
  skills: string[]
  education: string
  summary: string
  workHistory: Array<{
    company: string
    position: string
    duration: string
    description: string
  }>
}

export default function SmartResumeParsingPage() {
  const [fileName, setFileName] = useState('')
  const [parsedData, setParsedData] = useState<ParsedData | null>(null)
  const [isParsing, setIsParsing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [uploadProgress, setUploadProgress] = useState(0)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (file) {
      setFileName(file.name)
      setParsedData(null)
      setError(null)
      setUploadProgress(0)
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'text/plain': ['.txt']
    },
    multiple: false
  })

  const handleParseResume = async () => {
    if (!fileName) {
      setError('Please select a resume file first.')
      return
    }

    setIsParsing(true)
    setError(null)
    setParsedData(null)

    // Simulate upload progress
    const progressInterval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval)
          return 90
        }
        return prev + 10
      })
    }, 200)

    // Simulate API call
    setTimeout(() => {
      clearInterval(progressInterval)
      setUploadProgress(100)
      
      if (Math.random() > 0.1) { // Simulate success 90% of the time
        const mockData: ParsedData = {
          name: 'John Doe',
          email: 'john.doe@example.com',
          phone: '+1 (555) 123-4567',
          experience: '5 years in Software Development, 2 years as Team Lead',
          skills: ['React', 'Node.js', 'TypeScript', 'AWS', 'Docker', 'Agile', 'MongoDB', 'GraphQL'],
          education: 'M.Sc. Computer Science, University of Technology',
          summary: 'Experienced software engineer with expertise in full-stack development and team leadership. Passionate about creating scalable solutions and mentoring junior developers.',
          workHistory: [
            {
              company: 'TechCorp Inc.',
              position: 'Senior Software Engineer',
              duration: '2021 - Present',
              description: 'Led development of microservices architecture, mentored 3 junior developers, improved system performance by 40%'
            },
            {
              company: 'StartupXYZ',
              position: 'Full Stack Developer',
              duration: '2019 - 2021',
              description: 'Built and maintained React/Node.js applications, collaborated with cross-functional teams'
            }
          ]
        }
        setParsedData(mockData)
      } else {
        setError('Failed to parse resume. Please try again or upload a different file.')
      }
      setIsParsing(false)
    }, 3000)
  }

  const handleCopyData = () => {
    if (parsedData) {
      const dataString = JSON.stringify(parsedData, null, 2)
      navigator.clipboard.writeText(dataString)
      alert('Parsed data copied to clipboard!')
    }
  }

  const handleDownloadData = () => {
    if (parsedData) {
      const dataString = JSON.stringify(parsedData, null, 2)
      const blob = new Blob([dataString], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${parsedData.name.replace(/\s+/g, '-').toLowerCase()}-parsed-data.json`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link href="/dashboard" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4">
            ← Back to Dashboard
          </Link>
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-gradient-to-r from-green-600 to-blue-600 rounded-lg">
              <Brain className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Smart Resume Parsing</h1>
          </div>
          <p className="text-gray-600">Extract and analyze key information from resumes with advanced ML algorithms.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <UploadCloud className="mr-2 text-green-600" />
                Upload Resume
              </h2>

              <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                  isDragActive
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-300 hover:border-green-400 hover:bg-gray-50'
                }`}
              >
                <input {...getInputProps()} />
                <UploadCloud className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                {isDragActive ? (
                  <p className="text-green-600 font-medium">Drop the resume here...</p>
                ) : (
                  <div>
                    <p className="text-gray-600 font-medium mb-2">
                      Drag & drop your resume here, or <span className="text-green-600">browse</span>
                    </p>
                    <p className="text-sm text-gray-500">
                      Supported formats: PDF, DOC, DOCX, TXT
                    </p>
                  </div>
                )}
              </div>

              {fileName && (
                <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center">
                  <FileText className="h-5 w-5 text-green-600 mr-2" />
                  <span className="text-green-800 font-medium">{fileName}</span>
                </div>
              )}

              {uploadProgress > 0 && (
                <div className="mt-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Upload Progress</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                </div>
              )}

              <button
                onClick={handleParseResume}
                disabled={isParsing || !fileName}
                className={`w-full mt-6 flex items-center justify-center p-3 rounded-lg font-semibold transition-colors ${
                  isParsing || !fileName
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-green-600 text-white hover:bg-green-700'
                }`}
              >
                {isParsing ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Parsing Resume...
                  </>
                ) : (
                  <>
                    <Brain className="mr-2 h-5 w-5" />
                    Parse Resume
                  </>
                )}
              </button>

              {error && (
                <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg flex items-center">
                  <XCircle className="h-5 w-5 mr-2" />
                  {error}
                </div>
              )}
            </div>
          </div>

          {/* Results Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                <FileText className="mr-2 text-blue-600" />
                Parsed Information
              </h2>
              {parsedData && (
                <div className="flex space-x-2">
                  <button
                    onClick={handleCopyData}
                    className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                    title="Copy data"
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                  <button
                    onClick={handleDownloadData}
                    className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                    title="Download data"
                  >
                    <Download className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>

            <div className="border border-gray-200 rounded-lg p-4 min-h-[500px]">
              {parsedData ? (
                <div className="space-y-6">
                  {/* Basic Info */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                      <Eye className="mr-2 h-4 w-4" />
                      Basic Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium text-gray-600">Name:</span>
                        <p className="text-gray-900">{parsedData.name}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-600">Email:</span>
                        <p className="text-gray-900">{parsedData.email}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-600">Phone:</span>
                        <p className="text-gray-900">{parsedData.phone}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-600">Experience:</span>
                        <p className="text-gray-900">{parsedData.experience}</p>
                      </div>
                    </div>
                  </div>

                  {/* Skills */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {parsedData.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Education */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Education</h3>
                    <p className="text-gray-700">{parsedData.education}</p>
                  </div>

                  {/* Summary */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Professional Summary</h3>
                    <p className="text-gray-700 text-sm leading-relaxed">{parsedData.summary}</p>
                  </div>

                  {/* Work History */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Work History</h3>
                    <div className="space-y-4">
                      {parsedData.workHistory.map((job, index) => (
                        <div key={index} className="border-l-4 border-blue-500 pl-4">
                          <div className="flex justify-between items-start mb-1">
                            <h4 className="font-medium text-gray-900">{job.position}</h4>
                            <span className="text-sm text-gray-500">{job.duration}</span>
                          </div>
                          <p className="text-sm font-medium text-gray-600 mb-1">{job.company}</p>
                          <p className="text-sm text-gray-700">{job.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-center text-green-600 font-semibold">
                    <CheckCircle className="h-5 w-5 mr-2" />
                    Resume parsed successfully!
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500">
                  <div className="text-center">
                    <FileText className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p>Parsed information will appear here</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
