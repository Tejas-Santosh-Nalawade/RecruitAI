import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { candidateId, responses } = body

    // Process voice responses using AI
    const analysis = await analyzeVoiceResponses(responses)
    
    // Calculate screening score
    const screeningScore = calculateScreeningScore(analysis)
    
    // Update candidate with screening data
    const screeningData = {
      questions: responses.map((r: any) => r.question),
      responses: responses,
      audioUrl: responses[0]?.audioUrl || '',
      transcript: responses.map((r: any) => r.transcript).join('\n'),
      score: screeningScore,
      duration: responses.reduce((total: number, r: any) => total + (r.duration || 0), 0),
      completedAt: new Date()
    }

    // TODO: Update candidate in database
    console.log('Screening completed for candidate:', candidateId, screeningData)

    return NextResponse.json({ 
      screeningData,
      score: screeningScore,
      recommendation: getRecommendation(screeningScore)
    })
  } catch (error) {
    console.error('Error processing voice screening:', error)
    return NextResponse.json({ error: 'Failed to process screening' }, { status: 500 })
  }
}

async function analyzeVoiceResponses(responses: any[]) {
  // AI voice analysis using VAPI or similar service
  const analysis = responses.map(response => ({
    questionId: response.questionId,
    sentiment: analyzeSentiment(response.transcript),
    confidence: calculateConfidence(response.audioUrl),
    keyPoints: extractKeyPoints(response.transcript),
    technicalAccuracy: assessTechnicalAccuracy(response.transcript, response.question),
    communicationScore: assessCommunication(response.audioUrl)
  }))

  return analysis
}

function analyzeSentiment(transcript: string) {
  // Simple sentiment analysis - in production, use proper AI service
  const positiveWords = ['excited', 'passionate', 'love', 'enjoy', 'great', 'excellent']
  const negativeWords = ['difficult', 'challenging', 'struggle', 'hard', 'problem']
  
  const words = transcript.toLowerCase().split(' ')
  const positiveCount = words.filter(word => positiveWords.includes(word)).length
  const negativeCount = words.filter(word => negativeWords.includes(word)).length
  
  if (positiveCount > negativeCount) return 'positive'
  if (negativeCount > positiveCount) return 'negative'
  return 'neutral'
}

function calculateConfidence(audioUrl: string) {
  // Audio analysis for confidence - placeholder
  return Math.random() * 0.3 + 0.7 // 70-100%
}

function extractKeyPoints(transcript: string) {
  // Extract key points from transcript
  const sentences = transcript.split('.')
  return sentences.slice(0, 3).map(s => s.trim()).filter(s => s.length > 10)
}

function assessTechnicalAccuracy(transcript: string, question: string) {
  // Assess technical accuracy of response
  const technicalTerms = ['algorithm', 'database', 'API', 'framework', 'architecture', 'scalability']
  const words = transcript.toLowerCase().split(' ')
  const technicalCount = words.filter(word => technicalTerms.some(term => word.includes(term))).length
  
  return Math.min(technicalCount * 20, 100) // Max 100%
}

function assessCommunication(audioUrl: string) {
  // Communication assessment - placeholder
  return Math.random() * 20 + 70 // 70-90%
}

function calculateScreeningScore(analysis: any[]) {
  const avgScore = analysis.reduce((sum, item) => {
    const score = (item.confidence * 100 + item.technicalAccuracy + item.communicationScore) / 3
    return sum + score
  }, 0) / analysis.length
  
  return Math.round(avgScore)
}

function getRecommendation(score: number) {
  if (score >= 85) return 'strong-hire'
  if (score >= 75) return 'hire'
  if (score >= 65) return 'maybe'
  return 'no-hire'
}