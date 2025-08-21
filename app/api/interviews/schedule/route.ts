import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { 
      candidateName, 
      candidateEmail, 
      jobTitle, 
      preferredDate, 
      preferredTime,
      interviewType,
      duration,
      interviewerId 
    } = await request.json()

    // Simulate AI scheduling logic with calendar integration
    const scheduledInterview = {
      id: Math.random().toString(36).substr(2, 9),
      candidateName,
      candidateEmail,
      jobTitle,
      dateTime: `${preferredDate}T${preferredTime}`,
      duration: duration || 30,
      type: interviewType || 'video',
      status: 'scheduled',
      meetingLink: interviewType === 'video' ? 'https://meet.google.com/abc-xyz-123' : undefined,
      location: interviewType === 'in-person' ? 'Conference Room A, Floor 3' : undefined,
      interviewer: {
        id: interviewerId || 'recruiter-001',
        name: 'Sarah Johnson',
        email: 'sarah.johnson@company.com',
        title: 'Senior Recruiter'
      },
      calendarEvent: {
        googleCalendarId: 'calendar-event-123',
        outlookEventId: 'outlook-event-456',
        icsFile: 'data:text/calendar;charset=utf8,BEGIN:VCALENDAR...'
      },
      reminders: [
        {
          type: 'email',
          time: '24 hours before',
          sent: false
        },
        {
          type: 'email',
          time: '1 hour before',
          sent: false
        },
        {
          type: 'sms',
          time: '30 minutes before',
          sent: false
        }
      ],
      notes: 'Initial screening interview for the position. Focus on technical skills and cultural fit.',
      attachments: [
        {
          name: 'Interview Guide.pdf',
          url: '/documents/interview-guide.pdf'
        },
        {
          name: 'Company Overview.pdf',
          url: '/documents/company-overview.pdf'
        }
      ]
    }

    // Simulate sending confirmation emails
    const emailNotifications = {
      candidateEmail: {
        sent: true,
        template: 'interview-confirmation-candidate',
        subject: `Interview Confirmed: ${jobTitle} at Our Company`
      },
      interviewerEmail: {
        sent: true,
        template: 'interview-confirmation-interviewer',
        subject: `New Interview Scheduled: ${candidateName}`
      }
    }

    return NextResponse.json({ 
      success: true, 
      interview: scheduledInterview,
      notifications: emailNotifications,
      metadata: {
        scheduledAt: new Date().toISOString(),
        timezone: 'America/New_York',
        schedulingAlgorithm: 'AI-Optimized Scheduling'
      }
    })
  } catch (error) {
    console.error('Error scheduling interview:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to schedule interview' }, 
      { status: 500 }
    )
  }
}
