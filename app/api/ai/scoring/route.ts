import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { candidateId, resumeScore, screeningScore, interviewScore } = body

    // Calculate comprehensive AI scoring
    const scoring = calculateAIScoring({
      resumeScore: resumeScore || 0,
      screeningScore: screeningScore || 0,
      interviewScore: interviewScore || 0
    })

    // Update candidate ranking
    await updateCandidateRanking(candidateId, scoring)

    return NextResponse.json({ scoring })
  } catch (error) {
    console.error('Error calculating AI scoring:', error)
    return NextResponse.json({ error: 'Failed to calculate scoring' }, { status: 500 })
  }
}

function calculateAIScoring(scores: any) {
  const weights = {
    resume: 0.3,
    screening: 0.4,
    interview: 0.3
  }

  const totalScore = (
    scores.resumeScore * weights.resume +
    scores.screeningScore * weights.screening +
    scores.interviewScore * weights.interview
  )

  const breakdown = {
    skills: Math.round(scores.resumeScore * 0.4 + scores.screeningScore * 0.3 + scores.interviewScore * 0.3),
    experience: Math.round(scores.resumeScore * 0.6 + scores.interviewScore * 0.4),
    communication: Math.round(scores.screeningScore * 0.5 + scores.interviewScore * 0.5),
    technical: Math.round(scores.screeningScore * 0.6 + scores.interviewScore * 0.4)
  }

  const feedback = generateFeedback(breakdown, totalScore)
  const recommendation = getHiringRecommendation(totalScore)

  return {
    resumeScore: scores.resumeScore,
    screeningScore: scores.screeningScore,
    interviewScore: scores.interviewScore,
    totalScore: Math.round(totalScore),
    breakdown,
    feedback,
    recommendation
  }
}

function generateFeedback(breakdown: any, totalScore: number) {
  const feedback = []

  if (breakdown.skills >= 80) {
    feedback.push('Strong technical skills demonstrated')
  } else if (breakdown.skills >= 60) {
    feedback.push('Adequate technical skills, room for improvement')
  } else {
    feedback.push('Technical skills need development')
  }

  if (breakdown.communication >= 80) {
    feedback.push('Excellent communication abilities')
  } else if (breakdown.communication >= 60) {
    feedback.push('Good communication skills')
  } else {
    feedback.push('Communication skills could be improved')
  }

  if (breakdown.experience >= 80) {
    feedback.push('Extensive relevant experience')
  } else if (breakdown.experience >= 60) {
    feedback.push('Solid experience background')
  } else {
    feedback.push('Limited relevant experience')
  }

  return feedback
}

function getHiringRecommendation(totalScore: number) {
  if (totalScore >= 85) return 'strong-hire'
  if (totalScore >= 75) return 'hire'
  if (totalScore >= 65) return 'maybe'
  return 'no-hire'
}

async function updateCandidateRanking(candidateId: string, scoring: any) {
  // TODO: Update candidate ranking in database
  console.log('Updated candidate ranking:', candidateId, scoring)
}