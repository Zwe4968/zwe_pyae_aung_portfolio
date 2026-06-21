/// <reference types="vite/client" />

interface ImportMetaEnv {
  /**
   * Optional GitHub Personal Access Token to raise the GitHub REST API
   * rate limit from 60/hr (unauthenticated) to 5000/hr. Read client-side via
   * import.meta.env, so it ships inside the built JS bundle and is visible
   * to anyone who opens devtools — use a fine-grained token scoped to
   * "Public Repositories (read-only)" with no other permissions. See README.
   */
  readonly VITE_GITHUB_TOKEN?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
