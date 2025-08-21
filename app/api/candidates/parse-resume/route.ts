import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get('resume') as File

    if (!file) {
      return NextResponse.json(
        { success: false, error: 'No file uploaded' }, 
        { status: 400 }
      )
    }

    // Simulate resume parsing with comprehensive data extraction
    const parsedData = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '+1 (555) 123-4567',
      location: 'San Francisco, CA',
      experience: '7 years in software development, 3 years as a tech lead',
      skills: [
        'JavaScript', 'React', 'Node.js', 'TypeScript', 'Python', 
        'AWS', 'Docker', 'Kubernetes', 'MongoDB', 'PostgreSQL',
        'GraphQL', 'REST APIs', 'Agile', 'Scrum', 'Git'
      ],
      education: [
        {
          degree: 'M.Sc. Computer Science',
          institution: 'Stanford University',
          year: '2018',
          gpa: '3.8/4.0'
        },
        {
          degree: 'B.Sc. Computer Science',
          institution: 'University of California, Berkeley',
          year: '2016',
          gpa: '3.7/4.0'
        }
      ],
      workHistory: [
        {
          company: 'TechCorp Inc.',
          position: 'Senior Software Engineer',
          duration: '2021 - Present',
          location: 'San Francisco, CA',
          description: 'Led development of microservices architecture, mentored 3 junior developers, improved system performance by 40%',
          technologies: ['React', 'Node.js', 'AWS', 'Docker']
        },
        {
          company: 'StartupXYZ',
          position: 'Full Stack Developer',
          duration: '2019 - 2021',
          location: 'San Francisco, CA',
          description: 'Built and maintained React/Node.js applications, collaborated with cross-functional teams',
          technologies: ['React', 'Node.js', 'MongoDB', 'Express']
        }
      ],
      certifications: [
        'AWS Certified Solutions Architect',
        'Google Cloud Professional Developer',
        'Certified Scrum Master (CSM)'
      ],
      languages: ['English (Native)', 'Spanish (Fluent)'],
      summary: 'Experienced software engineer with expertise in full-stack development and team leadership. Passionate about creating scalable solutions and mentoring junior developers. Strong background in cloud technologies and agile methodologies.',
      linkedin: 'https://linkedin.com/in/johndoe',
      github: 'https://github.com/johndoe',
      portfolio: 'https://johndoe.dev'
    }

    return NextResponse.json({ 
      success: true, 
      data: parsedData,
      metadata: {
        parsedAt: new Date().toISOString(),
        fileSize: file.size,
        fileType: file.type,
        confidence: 0.92
      }
    })
  } catch (error) {
    console.error('Error parsing resume:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to parse resume' }, 
      { status: 500 }
    )
  }
}
