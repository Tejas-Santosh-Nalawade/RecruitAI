import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { jobTitle, companyName, requirements } = await request.json()

    // Simulate AI generation with more sophisticated content
    const generatedDescription = `
# ${jobTitle}

## About ${companyName}
We are a forward-thinking company dedicated to innovation and excellence in our industry. Our mission is to create meaningful impact through technology and collaboration.

## Job Description
We are seeking a talented and experienced ${jobTitle} to join our dynamic team. This role offers an exciting opportunity to work on cutting-edge projects and contribute to our company's growth and success.

## Key Responsibilities
- Develop and maintain high-quality software solutions that meet business requirements
- Collaborate with cross-functional teams to deliver exceptional results
- ${requirements || 'Ensure code quality and performance standards are met'}
- Participate in code reviews and technical discussions
- Stay updated with industry best practices and emerging technologies
- Mentor junior developers and contribute to team knowledge sharing
- Work in an agile environment with regular sprint planning and retrospectives

## Requirements
- Bachelor's degree in Computer Science, Engineering, or related field
- Proven experience in software development with a strong portfolio
- Strong problem-solving and analytical skills
- Excellent communication and teamwork abilities
- Experience with modern development frameworks and tools
- Knowledge of software development methodologies (Agile, Scrum)
- Ability to work independently and in a team environment

## Preferred Qualifications
- Master's degree in Computer Science or related field
- Experience with cloud platforms (AWS, Azure, GCP)
- Knowledge of DevOps practices and CI/CD pipelines
- Experience with microservices architecture
- Contributions to open-source projects

## Benefits
- Competitive salary and comprehensive benefits package
- Flexible work arrangements and remote work options
- Professional development opportunities and training programs
- Collaborative and inclusive work environment
- Health, dental, and vision insurance
- 401(k) retirement plan with company matching
- Generous paid time off and holidays
- Employee wellness programs

## How to Apply
Please submit your resume, cover letter, and portfolio through our application portal. We look forward to reviewing your application and potentially welcoming you to our team!

## Equal Opportunity Employer
${companyName} is an equal opportunity employer and values diversity in our workforce. We encourage applications from all qualified individuals regardless of race, color, religion, gender, sexual orientation, gender identity, age, national origin, or disability status.
    `

    return NextResponse.json({ 
      success: true, 
      description: generatedDescription,
      metadata: {
        wordCount: generatedDescription.split(' ').length,
        estimatedReadTime: Math.ceil(generatedDescription.split(' ').length / 200), // 200 words per minute
        generatedAt: new Date().toISOString()
      }
    })
  } catch (error) {
    console.error('Error generating job description:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to generate job description' }, 
      { status: 500 }
    )
  }
}
