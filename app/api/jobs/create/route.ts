import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth()
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { title, company, level, skills, location, type, salaryRange, description } = body

    // Generate AI job description if not provided
    let jobDescription = description
    if (!jobDescription) {
      jobDescription = await generateJobDescription({
        title,
        company,
        level,
        skills,
        location,
        type,
        salaryRange
      })
    }

    // Create job in database
    const job = {
      id: generateUniqueId(),
      title,
      company,
      description: jobDescription,
      requirements: generateRequirements(level, skills),
      skills,
      location,
      type,
      salary: salaryRange,
      recruiterId: userId,
      status: 'draft',
      screeningLink: `${process.env.NEXT_PUBLIC_APP_URL}/apply/${generateUniqueId()}`,
      createdAt: new Date(),
      updatedAt: new Date()
    }

    // TODO: Save to database
    console.log('Created job:', job)

    return NextResponse.json({ job })
  } catch (error) {
    console.error('Error creating job:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

async function generateJobDescription(jobData: any) {
  // AI job description generation logic
  const prompt = `Generate a compelling job description for a ${jobData.title} position at ${jobData.company}. 
  Level: ${jobData.level}
  Skills: ${jobData.skills.join(', ')}
  Location: ${jobData.location}
  Type: ${jobData.type}
  Salary: $${jobData.salaryRange.min}k - $${jobData.salaryRange.max}k`

  // TODO: Integrate with OpenAI or OmniDimension API
  return `We are seeking a talented ${jobData.title} to join our ${jobData.company} team. This ${jobData.type} position offers an exciting opportunity to work with cutting-edge technologies including ${jobData.skills.slice(0, 3).join(', ')}. 

Key Responsibilities:
• Develop and maintain high-quality software solutions
• Collaborate with cross-functional teams
• Participate in code reviews and technical discussions
• Contribute to architectural decisions

Requirements:
• ${jobData.level === 'senior' ? '5+' : jobData.level === 'mid' ? '3+' : '1+'} years of experience
• Strong proficiency in ${jobData.skills.slice(0, 2).join(' and ')}
• Experience with modern development practices
• Excellent communication skills

We offer competitive compensation ($${jobData.salaryRange.min}k - $${jobData.salaryRange.max}k), comprehensive benefits, and opportunities for professional growth.`
}

function generateRequirements(level: string, skills: string[]) {
  const experience = level === 'senior' ? '5+ years' : level === 'mid' ? '3+ years' : '1+ years'
  return [
    `${experience} of professional experience`,
    `Strong proficiency in ${skills.slice(0, 2).join(' and ')}`,
    'Experience with modern development practices',
    'Excellent problem-solving skills',
    'Strong communication and collaboration abilities'
  ]
}

function generateUniqueId() {
  return Math.random().toString(36).substring(2) + Date.now().toString(36)
}