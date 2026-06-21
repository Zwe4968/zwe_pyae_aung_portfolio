const PREFIX = 'portfolio-cache:'

interface CacheEntry<T> {
  value: T
  savedAt: number
}

function read<T>(key: string): CacheEntry<T> | null {
  try {
    const raw = localStorage.getItem(PREFIX + key)
    return raw ? (JSON.parse(raw) as CacheEntry<T>) : null
  } catch {
    return null
  }
}

function write<T>(key: string, value: T): void {
  try {
    localStorage.setItem(PREFIX + key, JSON.stringify({ value, savedAt: Date.now() }))
  } catch {
    // localStorage unavailable or full — caching is a best-effort optimization, not required
  }
}

/**
 * Serves a fresh value within `ttlMs`. Past that it refetches, but if the
 * refetch fails (e.g. GitHub's unauthenticated rate limit, which this app
 * can hit after a burst of visits) it serves the last known-good value
 * instead of surfacing an error — GitHub data changes rarely enough that
 * stale-but-real beats a broken section.
 */
export async function cachedFetch<T>(key: string, ttlMs: number, fetcher: () => Promise<T>): Promise<T> {
  const cached = read<T>(key)
  if (cached && Date.now() - cached.savedAt < ttlMs) {
    return cached.value
  }

  try {
    const fresh = await fetcher()
    write(key, fresh)
    return fresh
  } catch (err) {
    if (cached) return cached.value
    throw err
  }
}
