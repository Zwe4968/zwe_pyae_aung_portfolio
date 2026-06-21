import { useEffect, useState } from 'react'
import { fetchGithubRepos, fetchGithubUser, fetchRepoLanguages, getStaticProjects, safeFetch, GITHUB_USERNAME } from '../lib/github'
import type { GithubProfileData } from '../types'

function staticFallback(): GithubProfileData {
  const staticProjects = getStaticProjects()
  return {
    user: null,
    totalStars: staticProjects.reduce((sum, p) => sum + p.stars, 0),
    totalForks: staticProjects.reduce((sum, p) => sum + p.forks, 0),
    publicRepoCount: staticProjects.length,
    languageBytes: {},
    isLive: false,
    loading: false,
  }
}

/**
 * Same resilience pattern as useProjects: starts from numbers derived from
 * the curated static project list (so the stats grid is never empty or
 * fake-zero), then silently upgrades to live GitHub numbers if the API call
 * succeeds. Per-repo language byte stats are a nice-to-have enhancement
 * only — if they fail to load, the language breakdown card just doesn't
 * render rather than showing an error.
 */
export function useGithubProfile(): GithubProfileData {
  const [state, setState] = useState<GithubProfileData>(staticFallback)

  useEffect(() => {
    let cancelled = false

    async function load() {
      const [user, repos] = await Promise.all([
        safeFetch(() => fetchGithubUser(GITHUB_USERNAME)),
        safeFetch(() => fetchGithubRepos(GITHUB_USERNAME)),
      ])

      if (cancelled) return

      if (repos) {
        const active = repos.filter((r) => !r.archived)
        setState((s) => ({
          ...s,
          user,
          totalStars: active.reduce((sum, r) => sum + r.stargazers_count, 0),
          totalForks: active.reduce((sum, r) => sum + r.forks_count, 0),
          publicRepoCount: user?.public_repos ?? active.length,
          isLive: true,
        }))

        const languagesPerRepo = await Promise.all(active.map((r) => fetchRepoLanguages(GITHUB_USERNAME, r.name)))
        if (cancelled) return

        const languageBytes: Record<string, number> = {}
        for (const langs of languagesPerRepo) {
          for (const [lang, bytes] of Object.entries(langs)) {
            languageBytes[lang] = (languageBytes[lang] ?? 0) + bytes
          }
        }
        setState((s) => ({ ...s, languageBytes }))
      } else if (user) {
        setState((s) => ({ ...s, user, publicRepoCount: user.public_repos, isLive: true }))
      }
    }

    load()
    return () => {
      cancelled = true
    }
  }, [])

  return state
}
