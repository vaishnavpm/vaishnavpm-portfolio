export interface Social {
  github: string
  linkedin: string
  instagram: string
  email: string
  phone: string
  website: string
}

export interface Profile {
  name: string
  shortName: string
  tagline: string
  role: string
  specialization: string
  location: string
  yearsOfExperience: string
  bio: string
  avatarSvg: string
  resumeUrl: string
  social: Social
}

export interface SkillCategory {
  name: string
  items: string[]
}

export interface Skills {
  categories: SkillCategory[]
}

export interface ExperienceItem {
  company: string
  role: string
  period: string
  location: string
  summary: string
  highlights: string[]
}

export interface ProjectItem {
  id: string
  title: string
  subtitle: string
  description: string
  stack: string[]
  role: string
  year: string
  link: string
  image: string
  highlight: boolean
}

export interface EducationItem {
  degree: string
  institution: string
  university: string
  year: string
  gpa: string
}

export interface Portfolio {
  profile: Profile
  skills: Skills
  experience: ExperienceItem[]
  projects: ProjectItem[]
  education: EducationItem[]
  testimonials: unknown[]
}