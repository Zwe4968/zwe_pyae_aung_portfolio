import type { GithubRepo, GithubUser, Project, ProjectMeta, StaticProjectEntry } from '../types'
import staticProjectsRaw from '../data/projects.json'
import { cachedFetch } from './cache'

export const GITHUB_USERNAME = 'Zwe4968'

const API_BASE = 'https://api.github.com'
const TOKEN = import.meta.env.VITE_GITHUB_TOKEN

// GitHub's unauthenticated REST API allows only 60 requests/hour per IP.
// A personal access token (VITE_GITHUB_TOKEN) raises that to 5000/hour.
// Either way, an hour-long cache removes nearly all of that risk for a
// portfolio whose underlying repo data changes rarely.
const CACHE_TTL_MS = 60 * 60 * 1000

function authHeaders(): HeadersInit {
  return TOKEN ? { Authorization: `Bearer ${TOKEN}`, Accept: 'application/vnd.github+json' } : { Accept: 'application/vnd.github+json' }
}

export async function fetchGithubUser(username: string): Promise<GithubUser> {
  return cachedFetch(`user:${username}`, CACHE_TTL_MS, async () => {
    const res = await fetch(`${API_BASE}/users/${username}`, { headers: authHeaders() })
    if (!res.ok) throw new Error(`GitHub user fetch failed: ${res.status}`)
    return res.json()
  })
}

export async function fetchGithubRepos(username: string): Promise<GithubRepo[]> {
  return cachedFetch(`repos:${username}`, CACHE_TTL_MS, async () => {
    const res = await fetch(`${API_BASE}/users/${username}/repos?sort=updated&per_page=100`, { headers: authHeaders() })
    if (!res.ok) throw new Error(`GitHub repos fetch failed: ${res.status}`)
    return res.json()
  })
}

export async function fetchRepoLanguages(username: string, repo: string): Promise<Record<string, number>> {
  return cachedFetch(`languages:${username}/${repo}`, CACHE_TTL_MS, async () => {
    const res = await fetch(`${API_BASE}/repos/${username}/${repo}/languages`, { headers: authHeaders() })
    if (!res.ok) throw new Error(`GitHub languages fetch failed: ${res.status}`)
    return res.json()
  }).catch(() => ({}))
}

/** Never throws — callers treat `null` as "no live data available right now". */
export async function safeFetch<T>(fetcher: () => Promise<T>): Promise<T | null> {
  try {
    return await fetcher()
  } catch {
    return null
  }
}

const staticProjects = staticProjectsRaw as StaticProjectEntry[]

/**
 * Most curated projects live under GITHUB_USERNAME, but not all — e.g. a
 * collaboration hosted on someone else's account. Deriving owner/repo from
 * the entry's own githubUrl (rather than assuming GITHUB_USERNAME) keeps
 * the auto-generated OG screenshot pointed at the right repo either way.
 */
function parseOwnerRepo(githubUrl: string): { owner: string; repo: string } | null {
  const match = githubUrl.match(/github\.com\/([^/]+)\/([^/]+)\/?$/)
  return match ? { owner: match[1], repo: match[2] } : null
}

function toProject(entry: StaticProjectEntry, overrides: Partial<Project> = {}): Project {
  const ownerRepo = parseOwnerRepo(entry.githubUrl)
  return {
    name: entry.name,
    title: entry.title,
    description: entry.description,
    features: entry.features,
    techStack: entry.techStack,
    categories: entry.categories,
    isFork: entry.isFork,
    githubUrl: entry.githubUrl,
    demoUrl: entry.demoUrl,
    screenshotUrl:
      entry.screenshots?.[0] ??
      (ownerRepo ? `https://opengraph.githubassets.com/1/${ownerRepo.owner}/${ownerRepo.repo}` : ''),
    language: entry.language,
    featured: entry.featured,
    stars: entry.stars,
    forks: entry.forks,
    createdAt: entry.createdAt,
    updatedAt: entry.updatedAt,
    isLive: false,
    ...overrides,
  }
}

/** The curated, always-available project list — no network required. */
export function getStaticProjects(): Project[] {
  return staticProjects.map((entry) => toProject(entry))
}

const FALLBACK_META: ProjectMeta = {
  description: 'A project from my GitHub — details coming soon.',
  features: [],
  techStack: [],
  categories: ['other'],
}

/** Builds a Project for a live repo with no curated entry yet (e.g. just pushed). */
function buildProjectFromLiveRepo(repo: GithubRepo): Project {
  return {
    name: repo.name,
    title: repo.name.replace(/[_-]+/g, ' ').trim(),
    githubUrl: repo.html_url,
    demoUrl: repo.homepage?.trim() || null,
    screenshotUrl: `https://opengraph.githubassets.com/1/${repo.full_name}`,
    language: repo.language,
    featured: false,
    stars: repo.stargazers_count,
    forks: repo.forks_count,
    updatedAt: repo.pushed_at,
    createdAt: repo.created_at,
    isLive: true,
    isFork: repo.fork,
    ...FALLBACK_META,
    techStack: repo.language ? [repo.language] : [],
  }
}

/**
 * Merges live GitHub stats into the curated static list (so stars/forks/dates
 * stay fresh without losing the hand-written descriptions), and appends any
 * brand-new public repos GitHub knows about that aren't curated yet. Pass
 * `liveRepos: null` when the API call failed/was rate-limited — the curated
 * static list is returned unchanged in that case.
 */
export function mergeProjects(liveRepos: GithubRepo[] | null): Project[] {
  if (!liveRepos) return getStaticProjects()

  const liveByName = new Map(liveRepos.map((r) => [r.name, r]))
  const merged = staticProjects.map((entry) => {
    const ownerRepo = parseOwnerRepo(entry.githubUrl)
    // Only attempt to merge live stats for entries actually owned by
    // GITHUB_USERNAME — liveRepos only ever contains that account's repos,
    // so this also rules out a same-named repo elsewhere being matched by mistake.
    const live = ownerRepo?.owner === GITHUB_USERNAME ? liveByName.get(entry.name) : undefined
    if (!live) return toProject(entry)
    return toProject(entry, {
      stars: live.stargazers_count,
      forks: live.forks_count,
      updatedAt: live.pushed_at,
      demoUrl: live.homepage?.trim() || entry.demoUrl,
      isLive: true,
    })
  })

  const knownNames = new Set(staticProjects.map((p) => p.name))
  const newOnes = liveRepos.filter((r) => !knownNames.has(r.name) && !r.archived).map(buildProjectFromLiveRepo)

  return [...merged, ...newOnes]
}

export function rankProjects(projects: Project[]): Project[] {
  return [...projects].sort((a, b) => {
    const score = (p: Project) => (p.featured ? 1000 : 0) + p.stars * 10 + p.forks * 5 + new Date(p.updatedAt).getTime() / 1e12
    return score(b) - score(a)
  })
}
