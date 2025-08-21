"use client"

import React, { useState } from 'react'
import { Brain, Briefcase, FileText, Send, Copy, Download } from 'lucide-react'
import Link from 'next/link'

export default function AICreateJobPage() {
  const [jobTitle, setJobTitle] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [requirements, setRequirements] = useState('')
  const [generatedDescription, setGeneratedDescription] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)

  const handleGenerateDescription = async () => {
    if (!jobTitle || !companyName) {
      alert('Please fill in the job title and company name')
      return
    }

    setIsGenerating(true)
    
    // Simulate AI generation
    setTimeout(() => {
      const description = `
# ${jobTitle}

## About ${companyName}
We are a forward-thinking company dedicated to innovation and excellence in our industry.

## Job Description
We are seeking a talented and experienced ${jobTitle} to join our dynamic team. This role offers an exciting opportunity to work on cutting-edge projects and contribute to our company's growth.

## Key Responsibilities
- Develop and maintain high-quality software solutions
- Collaborate with cross-functional teams to deliver exceptional results
- ${requirements || 'Ensure code quality and performance standards are met'}
- Participate in code reviews and technical discussions
- Stay updated with industry best practices and emerging technologies

## Requirements
- Bachelor's degree in Computer Science or related field
- Proven experience in software development
- Strong problem-solving and analytical skills
- Excellent communication and teamwork abilities
- Experience with modern development frameworks and tools

## Benefits
- Competitive salary and benefits package
- Flexible work arrangements
- Professional development opportunities
- Collaborative and inclusive work environment

## How to Apply
Please submit your resume and cover letter through our application portal.
      `
      setGeneratedDescription(description)
      setIsGenerating(false)
    }, 2000)
  }

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(generatedDescription)
    alert('Job description copied to clipboard!')
  }

  const handleDownload = () => {
    const blob = new Blob([generatedDescription], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${jobTitle.replace(/\s+/g, '-').toLowerCase()}-job-description.md`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link href="/dashboard" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4">
            ← Back to Dashboard
          </Link>
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg">
              <Brain className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">AI Job Description Generator</h1>
          </div>
          <p className="text-gray-600">Generate compelling job descriptions with AI and auto-post to LinkedIn with one click.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <FileText className="mr-2 text-blue-600" />
              Job Details
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Job Title *
                </label>
                <input
                  type="text"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  placeholder="e.g., Senior Software Engineer"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company Name *
                </label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="e.g., TechCorp Inc."
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Key Requirements (Optional)
                </label>
                <textarea
                  value={requirements}
                  onChange={(e) => setRequirements(e.target.value)}
                  placeholder="Enter specific requirements, responsibilities, or skills..."
                  rows={4}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <button
                onClick={handleGenerateDescription}
                disabled={isGenerating || !jobTitle || !companyName}
                className={`w-full flex items-center justify-center p-3 rounded-lg font-semibold transition-colors ${
                  isGenerating || !jobTitle || !companyName
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700'
                }`}
              >
                {isGenerating ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Generating...
                  </>
                ) : (
                  <>
                    <Brain className="mr-2 h-5 w-5" />
                    Generate Job Description
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Generated Content */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                <Briefcase className="mr-2 text-green-600" />
                Generated Description
              </h2>
              {generatedDescription && (
                <div className="flex space-x-2">
                  <button
                    onClick={handleCopyToClipboard}
                    className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                    title="Copy to clipboard"
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                  <button
                    onClick={handleDownload}
                    className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                    title="Download as file"
                  >
                    <Download className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>

            <div className="border border-gray-200 rounded-lg p-4 min-h-[400px]">
              {generatedDescription ? (
                <div className="prose prose-sm max-w-none">
                  <pre className="whitespace-pre-wrap font-sans text-gray-800 leading-relaxed">
                    {generatedDescription}
                  </pre>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500">
                  <div className="text-center">
                    <FileText className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p>Your AI-generated job description will appear here</p>
                  </div>
                </div>
              )}
            </div>

            {generatedDescription && (
              <div className="mt-6 space-y-3">
                <button className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center">
                  <Send className="mr-2 h-5 w-5" />
                  Post to LinkedIn
                </button>
                <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center">
                  <Briefcase className="mr-2 h-5 w-5" />
                  Create Job Posting
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
