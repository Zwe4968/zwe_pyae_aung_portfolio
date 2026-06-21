import { useEffect, useState } from 'react'
import { fetchGithubRepos, getStaticProjects, mergeProjects, rankProjects, safeFetch, GITHUB_USERNAME } from '../lib/github'
import type { ProjectsData } from '../types'

/**
 * Renders the curated static project list immediately (no network wait),
 * then tries to silently refresh it with live GitHub stats in the
 * background. If the API call fails for any reason — rate limit, offline,
 * GitHub outage — the curated list just stays as-is. There is no error
 * state by design: a portfolio's project list should never look broken.
 */
export function useProjects(): ProjectsData {
  const [state, setState] = useState<ProjectsData>(() => ({
    projects: rankProjects(getStaticProjects()),
    isLive: false,
  }))

  useEffect(() => {
    let cancelled = false

    safeFetch(() => fetchGithubRepos(GITHUB_USERNAME)).then((repos) => {
      if (cancelled || !repos) return
      setState({ projects: rankProjects(mergeProjects(repos)), isLive: true })
    })

    return () => {
      cancelled = true
    }
  }, [])

  return state
}
