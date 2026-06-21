export type ProjectCategory = 'networking' | 'web' | 'database' | 'iot' | 'ai-ml' | 'security' | 'other'

export interface GithubUser {
  login: string
  name: string | null
  avatar_url: string
  html_url: string
  bio: string | null
  public_repos: number
  followers: number
  following: number
  created_at: string
}

export interface GithubRepo {
  id: number
  name: string
  full_name: string
  description: string | null
  html_url: string
  homepage: string | null
  language: string | null
  stargazers_count: number
  forks_count: number
  watchers_count: number
  open_issues_count: number
  created_at: string
  updated_at: string
  pushed_at: string
  fork: boolean
  archived: boolean
  topics: string[]
}

export interface ProjectMeta {
  description: string
  features: string[]
  techStack: string[]
  categories: ProjectCategory[]
  isFork?: boolean
}

/** Shape of each entry in the curated src/data/projects.json database. */
export interface StaticProjectEntry extends ProjectMeta {
  name: string
  title: string
  githubUrl: string
  demoUrl: string | null
  language: string | null
  featured: boolean
  stars: number
  forks: number
  createdAt: string
  updatedAt: string
  screenshots?: string[]
}

export interface Project extends ProjectMeta {
  name: string
  title: string
  githubUrl: string
  demoUrl: string | null
  screenshotUrl: string
  language: string | null
  featured: boolean
  stars: number
  forks: number
  updatedAt: string
  createdAt: string
  /** true once live GitHub stats (stars/forks/updatedAt) have been merged in for this entry */
  isLive: boolean
}

export interface ProjectsData {
  projects: Project[]
  isLive: boolean
}

export interface GithubProfileData {
  user: GithubUser | null
  totalStars: number
  totalForks: number
  publicRepoCount: number
  languageBytes: Record<string, number>
  isLive: boolean
  loading: boolean
}

export type SkillCategory = {
  title: string
  icon: string
  skills: { name: string; level: number }[]
}

export type EducationEntry = {
  school: string
  location: string
  degree: string
  major: string
  period: string
  gpa?: string | null
  note?: string | null
}

export type ExperienceEntry = {
  role: string
  company: string
  period: string
  duties: string[]
}

export type CertificationEntry = {
  name: string
  issuer: string
  date: string
  credentialId?: string | null
  credentialUrl?: string | null
}

export type AchievementEntry = {
  title: string
  description: string
  year: string
}
