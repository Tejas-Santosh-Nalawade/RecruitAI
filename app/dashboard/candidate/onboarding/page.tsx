"use client"

import React, { useState } from 'react'
import { FileText, Signature, UploadCloud, CheckCircle, XCircle, Users, Calendar, Clock, Download } from 'lucide-react'
import Link from 'next/link'

interface Document {
  id: string
  name: string
  status: 'Pending' | 'Signed' | 'Uploaded' | 'Rejected'
  type: 'signature' | 'upload'
  description: string
  required: boolean
  dueDate?: string
}

const initialDocuments: Document[] = [
  { 
    id: '1',
    name: 'Offer Letter', 
    status: 'Pending', 
    type: 'signature',
    description: 'Please review and sign your offer letter',
    required: true,
    dueDate: '2024-02-10'
  },
  { 
    id: '2',
    name: 'Non-Disclosure Agreement (NDA)', 
    status: 'Pending', 
    type: 'signature',
    description: 'Sign the confidentiality agreement',
    required: true,
    dueDate: '2024-02-10'
  },
  { 
    id: '3',
    name: 'Employee Handbook Acknowledgment', 
    status: 'Pending', 
    type: 'signature',
    description: 'Acknowledge receipt of employee handbook',
    required: true,
    dueDate: '2024-02-12'
  },
  { 
    id: '4',
    name: 'W-4 Tax Form', 
    status: 'Pending', 
    type: 'upload',
    description: 'Upload your completed W-4 tax form',
    required: true,
    dueDate: '2024-02-12'
  },
  { 
    id: '5',
    name: 'Direct Deposit Form', 
    status: 'Pending', 
    type: 'upload',
    description: 'Provide bank account information for direct deposit',
    required: true,
    dueDate: '2024-02-12'
  },
  { 
    id: '6',
    name: 'Emergency Contact Form', 
    status: 'Pending', 
    type: 'upload',
    description: 'Provide emergency contact information',
    required: false,
    dueDate: '2024-02-15'
  },
]

export default function CandidateOnboardingPage() {
  const [documents, setDocuments] = useState<Document[]>(initialDocuments)
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null)
  const [showSignatureModal, setShowSignatureModal] = useState(false)
  const [signatureData, setSignatureData] = useState('')

  const totalDocuments = documents.length
  const completedDocuments = documents.filter(doc => doc.status !== 'Pending').length
  const progress = totalDocuments > 0 ? (completedDocuments / totalDocuments) * 100 : 0

  const handleSignDocument = (documentId: string) => {
    setSelectedDocument(documents.find(doc => doc.id === documentId) || null)
    setShowSignatureModal(true)
  }

  const handleUploadDocument = (documentId: string, fileName: string) => {
    setDocuments(prevDocs => 
      prevDocs.map((doc) => 
        doc.id === documentId 
          ? { ...doc, status: 'Uploaded', name: `${doc.name} (${fileName})` }
          : doc
      )
    )
  }

  const handleConfirmSignature = () => {
    if (selectedDocument && signatureData.trim()) {
      setDocuments(prevDocs => 
        prevDocs.map((doc) => 
          doc.id === selectedDocument.id 
            ? { ...doc, status: 'Signed' }
            : doc
        )
      )
      setShowSignatureModal(false)
      setSignatureData('')
      setSelectedDocument(null)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Signed':
      case 'Uploaded':
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case 'Rejected':
        return <XCircle className="h-5 w-5 text-red-500" />
      default:
        return <Clock className="h-5 w-5 text-yellow-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Signed':
      case 'Uploaded':
        return 'bg-green-100 text-green-800'
      case 'Rejected':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-yellow-100 text-yellow-800'
    }
  }

  const isOverdue = (dueDate: string) => {
    return new Date(dueDate) < new Date()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link href="/dashboard" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4">
            ← Back to Dashboard
          </Link>
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg">
              <Users className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Digital Onboarding</h1>
          </div>
          <p className="text-gray-600">Complete your onboarding process with e-signatures and document uploads.</p>
        </div>

        {/* Progress Overview */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Your Onboarding Progress</h2>
            <div className="text-right">
              <div className="text-2xl font-bold text-blue-600">{Math.round(progress)}%</div>
              <div className="text-sm text-gray-500">Complete</div>
            </div>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
            <div 
              className="bg-gradient-to-r from-blue-600 to-purple-600 h-4 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          
          <div className="flex justify-between text-sm text-gray-600">
            <span>{completedDocuments} of {totalDocuments} documents completed</span>
            <span>Start Date: {new Date().toLocaleDateString()}</span>
          </div>
        </div>

        {/* Documents List */}
        <div className="space-y-4">
          {documents.map((doc) => (
            <div key={doc.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <FileText className="h-6 w-6 text-gray-500" />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{doc.name}</h3>
                      <p className="text-sm text-gray-600">{doc.description}</p>
                    </div>
                    {doc.required && (
                      <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full font-medium">
                        Required
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      Due: {doc.dueDate ? new Date(doc.dueDate).toLocaleDateString() : 'No due date'}
                    </div>
                    {doc.dueDate && isOverdue(doc.dueDate) && doc.status === 'Pending' && (
                      <span className="text-red-600 font-medium">Overdue</span>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(doc.status)}
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(doc.status)}`}>
                      {doc.status}
                    </span>
                  </div>
                  
                  {doc.status === 'Pending' && (
                    <div className="flex space-x-2">
                      {doc.type === 'signature' ? (
                        <button
                          onClick={() => handleSignDocument(doc.id)}
                          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                        >
                          <Signature className="h-4 w-4 mr-2" />
                          Sign Now
                        </button>
                      ) : (
                        <label className="cursor-pointer bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center">
                          <UploadCloud className="h-4 w-4 mr-2" />
                          Upload File
                          <input 
                            type="file" 
                            className="hidden" 
                            onChange={(e) => {
                              const file = e.target.files?.[0]
                              if (file) handleUploadDocument(doc.id, file.name)
                            }}
                          />
                        </label>
                      )}
                    </div>
                  )}
                  
                  {doc.status === 'Signed' || doc.status === 'Uploaded' ? (
                    <button className="text-gray-600 hover:text-gray-800">
                      <Download className="h-4 w-4" />
                    </button>
                  ) : null}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Completion Message */}
        {progress === 100 && (
          <div className="mt-8 bg-green-50 border border-green-200 rounded-xl p-6 text-center">
            <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-green-900 mb-2">Congratulations!</h3>
            <p className="text-green-700">Your onboarding is complete. Welcome to the team!</p>
            <div className="mt-4">
              <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors">
                View Welcome Package
              </button>
            </div>
          </div>
        )}

        {/* Signature Modal */}
        {showSignatureModal && selectedDocument && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl max-w-md w-full p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Sign {selectedDocument.name}</h3>
                <button
                  onClick={() => setShowSignatureModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
              
              <div className="space-y-4">
                <p className="text-gray-600">{selectedDocument.description}</p>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Signature
                  </label>
                  <textarea
                    value={signatureData}
                    onChange={(e) => setSignatureData(e.target.value)}
                    placeholder="Type your full name to sign..."
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    rows={3}
                  />
                </div>
                
                <div className="flex space-x-3">
                  <button
                    onClick={handleConfirmSignature}
                    disabled={!signatureData.trim()}
                    className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                      signatureData.trim()
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    Confirm Signature
                  </button>
                  <button
                    onClick={() => setShowSignatureModal(false)}
                    className="flex-1 py-2 px-4 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Help Section */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-3 flex items-center">
            <Users className="mr-2 h-5 w-5" />
            Need Help?
          </h3>
          <p className="text-blue-700 mb-4">
            If you have any questions about the onboarding process or need assistance with any documents, 
            please don't hesitate to reach out to our HR team.
          </p>
          <div className="flex space-x-4">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Contact HR
            </button>
            <button className="bg-white text-blue-600 px-4 py-2 rounded-lg border border-blue-600 hover:bg-blue-50 transition-colors">
              View FAQ
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
