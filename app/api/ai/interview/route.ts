import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { candidateId, type = 'ai' } = body

    if (type === 'ai') {
      // Start AI interview session
      const interviewSession = await startAIInterview(candidateId)
      return NextResponse.json({ interviewSession })
    } else {
      // Schedule human interview
      const scheduledInterview = await scheduleHumanInterview(candidateId, body)
      return NextResponse.json({ scheduledInterview })
    }
  } catch (error) {
    console.error('Error handling interview:', error)
    return NextResponse.json({ error: 'Failed to process interview request' }, { status: 500 })
  }
}

async function startAIInterview(candidateId: string) {
  // Initialize AI interview using VAPI or similar
  const questions = [
    {
      id: 'q1',
      question: 'Tell me about your experience with the technologies mentioned in the job description.',
      type: 'technical',
      difficulty: 'medium'
    },
    {
      id: 'q2',
      question: 'Describe a challenging project you worked on and how you overcame the difficulties.',
      type: 'behavioral',
      difficulty: 'medium'
    },
    {
      id: 'q3',
      question: 'How do you stay updated with the latest technology trends?',
      type: 'behavioral',
      difficulty: 'easy'
    }
  ]

  const session = {
    id: generateUniqueId(),
    candidateId,
    questions,
    status: 'active',
    startedAt: new Date(),
    vapiSessionId: 'vapi_session_' + Date.now()
  }

  // TODO: Start actual VAPI session
  console.log('Started AI interview session:', session)

  return session
}

async function scheduleHumanInterview(candidateId: string, data: any) {
  const { interviewerEmail, scheduledTime, duration = 60 } = data

  const interview = {
    id: generateUniqueId(),
    candidateId,
    interviewerEmail,
    scheduledAt: new Date(scheduledTime),
    duration,
    type: 'human',
    status: 'scheduled',
    meetingLink: `https://meet.google.com/${generateUniqueId()}`,
    createdAt: new Date()
  }

  // TODO: Send calendar invites, save to database
  console.log('Scheduled human interview:', interview)

  return interview
}

function generateUniqueId() {
  return Math.random().toString(36).substring(2) + Date.now().toString(36)
}