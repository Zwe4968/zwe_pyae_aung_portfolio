# Zwe Pyae Aung — Portfolio

A premium, multilingual personal portfolio built with React, TypeScript, Vite, Tailwind CSS, and Framer Motion. CV content lives in [src/data/cvData.ts](src/data/cvData.ts). Project data uses a hybrid static + live model: a curated [src/data/projects.json](src/data/projects.json) database renders instantly and is never broken, while the GitHub REST API silently refreshes it in the background when available.

## Tech Stack

- React 18 + TypeScript + Vite 5
- Tailwind CSS (dark mode via `class` strategy)
- Framer Motion (scroll animations)
- React Router (SPA routing, deep-link safe on Vercel/Netlify/GitHub Pages)
- i18next / react-i18next (English, Burmese, Thai, Chinese — instant switch, no reload, cached in `localStorage`)
- Lucide React (icons)
- GitHub REST API as a progressive enhancement over a static project database (see below)

## Folder Structure

```
Portfolio/
├── public/
│   ├── favicon.svg
│   ├── 404.html                     # GitHub Pages SPA fallback (see below)
│   ├── _redirects                   # Netlify SPA fallback
│   ├── robots.txt / sitemap.xml
│   └── Zwe-Pyae-Aung-Resume.pdf     # served by "Download Resume"
├── src/
│   ├── components/                  # one component per section
│   ├── context/ThemeContext.tsx     # dark/light toggle, persisted in localStorage
│   ├── data/
│   │   ├── cvData.ts                # all real CV content — edit here
│   │   └── projects.json            # curated project database — edit here
│   ├── hooks/
│   │   ├── useProjects.ts           # static-first, live-enhanced project list
│   │   └── useGithubProfile.ts      # static-first, live-enhanced profile stats
│   ├── i18n/                        # i18next config + en/my/th/zh locale JSON
│   ├── lib/
│   │   ├── github.ts                # GitHub API client + static/live merge logic
│   │   └── cache.ts                 # localStorage cache with stale-fallback
│   ├── pages/Home.tsx
│   ├── types/index.ts
│   ├── App.tsx
│   └── main.tsx                     # BrowserRouter basename = import.meta.env.BASE_URL
├── .env.example                     # VITE_GITHUB_TOKEN documentation
├── vercel.json                      # SPA rewrites + cache headers
├── netlify.toml                     # SPA redirects + cache headers
├── vite.config.ts                   # base path: "/" normally, repo subpath in ghpages mode
├── tailwind.config.js
├── tsconfig*.json
└── package.json                     # predeploy/deploy scripts, gh-pages devDependency
```

## Getting Started

```bash
npm install
npm run dev       # http://localhost:5173
```

## Build

```bash
npm run build      # tsc -b && vite build → dist/
npm run preview    # preview the production build locally
```

## Updating Content

- **CV/resume text** — edit [src/data/cvData.ts](src/data/cvData.ts) (personal info, career objective, education, experience, skills, certifications, achievements). To swap the downloadable résumé, replace `public/Zwe-Pyae-Aung-Resume.pdf`.
- **LinkedIn** — `personalInfo.linkedin` in `cvData.ts` is currently an empty string (no URL was supplied), so the LinkedIn button/link is hidden everywhere. Set it once you have a real profile URL.
- **Projects** — edit [src/data/projects.json](src/data/projects.json) directly: name, title, description, features, techStack, categories, githubUrl, demoUrl, language, featured, stars/forks/dates. This file is the source of truth and renders with zero network calls. When the GitHub API is reachable, live stars/forks/last-updated are merged on top of it automatically, and any brand-new repo GitHub knows about but that isn't in this file yet still appears with a generic fallback description — add a proper entry for it here whenever you get a chance.
- **Translations** — UI chrome (nav, buttons, section titles, labels) is translated in [src/i18n/locales/{en,my,th}.json](src/i18n/locales). CV/project body text is intentionally left in English in all three locales — those are technical statements and are safer to leave verified-accurate in one language than risk a mistranslation; translate them yourself if you want full localization.

## GitHub Integration: Hybrid Static + Live Model

The Projects and GitHub Stats sections never depend on a successful network call to render something real:

1. **Static-first.** [src/data/projects.json](src/data/projects.json) renders immediately on page load — no spinner, no network wait, no possibility of an empty or broken state.
2. **Live enhancement, silent.** In the background, [useProjects](src/hooks/useProjects.ts) and [useGithubProfile](src/hooks/useGithubProfile.ts) try the GitHub REST API. On success, stars/forks/last-updated/follower counts are merged in live, and the language-breakdown chart appears.
3. **Failure is invisible to the visitor.** If the API call fails for *any* reason — rate limit, offline, GitHub outage — the hooks just keep showing the static data. There is no error string anywhere in this flow by design (verified by deliberately blocking `api.github.com` and confirming zero error text renders).
4. **Caching.** [src/lib/cache.ts](src/lib/cache.ts) wraps every GitHub API call in a 1-hour localStorage cache with stale-fallback — a failed refresh serves the last successful response instead of nothing.
5. **Optional token.** Set `VITE_GITHUB_TOKEN` (see `.env.example`) to raise the rate limit from 60/hr to 5000/hr. **This value ships inside the public JS bundle** — anyone can read it from devtools — so only ever use a fine-grained GitHub token scoped to **"Public Repositories (read-only)"** with no other permissions. Never put a classic PAT or a token with write/private-repo access here.

Other notes:
- Repo "screenshots" use GitHub's own auto-generated Open Graph image (`opengraph.githubassets.com`) — real, always available, no manual upload needed.
- The contribution graph uses the public `ghchart.rshah.org` image service, which renders live GitHub data server-side and works independently of the rate-limit-prone REST API calls above.
- Demo links only render when a project's `demoUrl` is set — none of the current repos have a live demo, so cards correctly show "No live demo" rather than a fake link.

## Deployment

### Vercel

1. Push this repo to GitHub/GitLab/Bitbucket.
2. Go to [vercel.com/new](https://vercel.com/new) and import the repo.
3. Framework preset: **Vite**. Build command: `npm run build`. Output directory: `dist`. (`vercel.json` already handles SPA rewrites.)
4. Click **Deploy**.

Or via CLI:

```bash
npm i -g vercel
vercel --prod
```

### Netlify

1. Push this repo to GitHub/GitLab/Bitbucket.
2. Go to [app.netlify.com](https://app.netlify.com) → **Add new site** → **Import an existing project**.
3. Build command: `npm run build`. Publish directory: `dist`. (`netlify.toml` / `public/_redirects` already handle SPA routing.)
4. Click **Deploy site**.

Or via CLI:

```bash
npm i -g netlify-cli
netlify deploy --prod --dir=dist
```

### GitHub Pages

GitHub Pages serves this repo at a **subpath** (`https://Zwe4968.github.io/zwe_pyae_aung_portfolio/`), not the domain root — different from Vercel/Netlify above. That's handled by a dedicated build mode rather than changing the default `base`, so all three deployment targets keep working from the same codebase:

- `npm run build` (default) → `base: "/"` → for Vercel/Netlify.
- `npm run build:ghpages` → `base: "/zwe_pyae_aung_portfolio/"` → for GitHub Pages. The `predeploy` script below already calls this automatically.

**Step 1 — Create the GitHub repository** (one-time):

```bash
cd "Portfolio"
git init
git add .
git commit -m "Initial commit"
```

Then either via the `gh` CLI (if installed and logged in):

```bash
gh repo create zwe_pyae_aung_portfolio --public --source=. --remote=origin
git push -u origin main
```

…or manually: go to [github.com/new](https://github.com/new), name the repository `zwe_pyae_aung_portfolio`, leave it empty (no README/.gitignore — this project already has them), click **Create repository**, then run the `git remote add` / `git push` commands GitHub shows you on the next page.

**Step 2 — Install gh-pages and deploy:**

```bash
npm install
npm run deploy
```

`npm run deploy` runs `predeploy` (`build:ghpages`) first, then pushes the contents of `dist/` to a `gh-pages` branch using the `gh-pages` npm package — it creates that branch automatically the first time, no manual branch setup needed.

**Step 3 — Enable GitHub Pages in repo settings** (one-time, after the first deploy):

1. On GitHub, open the repo → **Settings** → **Pages** (left sidebar).
2. Under **Build and deployment** → **Source**, select **Deploy from a branch**.
3. Under **Branch**, select **`gh-pages`** and folder **`/ (root)`**, then **Save**.
4. Wait 1–2 minutes for the first deployment to finish (check the **Actions** tab or the Pages settings page for the green "Your site is live at…" banner).

**Step 4 — Visit your live site:**

```
https://Zwe4968.github.io/zwe_pyae_aung_portfolio/
```

**Redeploying after future changes** is just:

```bash
npm run deploy
```

#### Routing fix for GitHub Pages (already applied)

GitHub Pages has no server-side rewrite rules, so a `BrowserRouter` app deep-linked or refreshed on any path other than the root would normally 404. This project keeps `BrowserRouter` (switching to `HashRouter` would conflict with the in-page `#about`/`#skills`/etc. anchor links already used for scroll navigation) and instead uses the standard [rafgraph SPA-on-GitHub-Pages pattern](https://github.com/rafgraph/spa-github-pages):

- [public/404.html](public/404.html) — GitHub Pages serves this for any unknown path; it re-encodes the path into a query string and redirects to the real app.
- [index.html](index.html) — a small inline script decodes that query string back into the real URL via `history.replaceState` before React Router ever reads `window.location`.
- [src/main.tsx](src/main.tsx) — `<BrowserRouter basename={import.meta.env.BASE_URL}>` so the router's path matching lines up with the actual deployed subpath instead of assuming the domain root.

This was verified end-to-end by building with `build:ghpages`, serving the output at the exact subpath locally (`vite preview`, which also respects `base`), and confirming the hero section renders both on first load and after a hard refresh, with the résumé link resolving to `/zwe_pyae_aung_portfolio/Zwe-Pyae-Aung-Resume.pdf` rather than 404ing at the bare root.

#### Troubleshooting

| Symptom | Likely cause | Fix |
|---|---|---|
| Blank white page after deploy | `base` doesn't match the repo name, or you deployed with `npm run build` instead of `npm run deploy` | Confirm the repo name in `vite.config.ts`'s `mode === 'ghpages'` branch matches your actual GitHub repo name exactly (case-sensitive), then redeploy with `npm run deploy` |
| Assets 404 (check the Network tab) | Same as above — wrong/missing `base` prefix | Same fix; also confirm `npm install` ran so `gh-pages` is present |
| Page works on `/` but 404s after refreshing or sharing a deep link | `404.html` fallback missing from `gh-pages` branch | Re-run `npm run deploy` — `public/404.html` is copied into `dist/` on every build, so a fresh deploy includes it |
| Old version still showing after deploy | Browser cache or GitHub's CDN cache | Hard-refresh (Ctrl+Shift+R), or wait a minute — GitHub Pages caches assets briefly after each deploy |
| `gh-pages` command not found | Dependencies not installed | Run `npm install` (it's a devDependency, already in `package.json`) |
| `git push` fails with permission/auth errors | Not authenticated with GitHub yet | Run `gh auth login`, or set up a personal access token / SSH key for `git` per [GitHub's docs](https://docs.github.com/en/authentication) |
| Pages settings has no `gh-pages` branch to select | Haven't run `npm run deploy` yet | Run it once — the branch is created automatically on first deploy, then it'll appear in the Pages branch dropdown |
| Site live but social previews / Google show the wrong URL | `index.html`'s canonical link, JSON-LD, `robots.txt`, and `sitemap.xml` are hardcoded to the GitHub Pages URL | If you also deploy to Vercel/Netlify with a custom domain, update those four files back to that domain for that deployment |
