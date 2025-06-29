import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth()
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const {
      candidateId,
      candidateName,
      candidateEmail,
      jobTitle,
      interviewType,
      scheduledDate,
      scheduledTime,
      duration,
      interviewerEmail,
      meetingPlatform,
      notes,
      questions
    } = body

    // Create interview record
    const interview = {
      id: generateUniqueId(),
      candidateId,
      candidateName,
      candidateEmail,
      jobTitle,
      interviewType,
      scheduledAt: new Date(`${scheduledDate}T${scheduledTime}`),
      duration,
      interviewerEmail: interviewType === 'ai' ? 'ai@recruitai.com' : interviewerEmail,
      meetingPlatform: interviewType === 'ai' ? 'ai-platform' : meetingPlatform,
      meetingLink: generateMeetingLink(meetingPlatform, interviewType),
      notes,
      questions,
      status: 'scheduled',
      recruiterId: userId,
      createdAt: new Date(),
      updatedAt: new Date()
    }

    // TODO: Save to database
    console.log('Created interview:', interview)

    // Send calendar invites
    if (interviewType !== 'ai') {
      await sendCalendarInvite(interview)
    } else {
      await scheduleAIInterview(interview)
    }

    // Send notification emails
    await sendInterviewNotifications(interview)

    return NextResponse.json({ 
      success: true, 
      interview,
      message: 'Interview created successfully'
    })
  } catch (error) {
    console.error('Error creating interview:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

function generateUniqueId() {
  return Math.random().toString(36).substring(2) + Date.now().toString(36)
}

function generateMeetingLink(platform: string, interviewType: string) {
  if (interviewType === 'ai') {
    return `${process.env.NEXT_PUBLIC_APP_URL}/ai-interview/${generateUniqueId()}`
  }

  switch (platform) {
    case 'google-meet':
      return `https://meet.google.com/${generateUniqueId()}`
    case 'zoom':
      return `https://zoom.us/j/${Math.random().toString().substring(2, 12)}`
    case 'teams':
      return `https://teams.microsoft.com/l/meetup-join/${generateUniqueId()}`
    default:
      return 'Phone call - number will be provided'
  }
}

async function sendCalendarInvite(interview: any) {
  // TODO: Integrate with Google Calendar API or similar
  console.log('Sending calendar invite for interview:', interview.id)
  
  const calendarEvent = {
    summary: `Interview: ${interview.jobTitle}`,
    description: `Interview with ${interview.candidateName}\n\nMeeting Link: ${interview.meetingLink}\n\nNotes: ${interview.notes}`,
    start: {
      dateTime: interview.scheduledAt.toISOString(),
      timeZone: 'America/New_York'
    },
    end: {
      dateTime: new Date(interview.scheduledAt.getTime() + interview.duration * 60000).toISOString(),
      timeZone: 'America/New_York'
    },
    attendees: [
      { email: interview.candidateEmail },
      { email: interview.interviewerEmail }
    ]
  }

  // TODO: Create calendar event via API
  return calendarEvent
}

async function scheduleAIInterview(interview: any) {
  // TODO: Schedule AI interview session
  console.log('Scheduling AI interview:', interview.id)
  
  const aiSession = {
    interviewId: interview.id,
    candidateEmail: interview.candidateEmail,
    scheduledAt: interview.scheduledAt,
    questions: interview.questions,
    duration: interview.duration,
    jobTitle: interview.jobTitle
  }

  // TODO: Integrate with AI interview platform (VAPI, etc.)
  return aiSession
}

async function sendInterviewNotifications(interview: any) {
  // TODO: Send email notifications
  console.log('Sending interview notifications for:', interview.id)
  
  const candidateEmail = {
    to: interview.candidateEmail,
    subject: `Interview Scheduled: ${interview.jobTitle}`,
    body: `Dear ${interview.candidateName},\n\nYour interview has been scheduled for ${interview.scheduledAt}.\n\nMeeting Link: ${interview.meetingLink}\n\nBest regards,\nRecruitAI Team`
  }

  if (interview.interviewType !== 'ai') {
    const interviewerEmail = {
      to: interview.interviewerEmail,
      subject: `Interview Scheduled: ${interview.candidateName}`,
      body: `Interview scheduled with ${interview.candidateName} for ${interview.jobTitle} position.\n\nTime: ${interview.scheduledAt}\nMeeting Link: ${interview.meetingLink}\n\nQuestions and notes are available in the RecruitAI dashboard.`
    }
    
    // TODO: Send interviewer email
  }

  // TODO: Send actual emails
  return { candidateEmail }
}