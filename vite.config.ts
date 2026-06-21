import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages serves this repo at https://Zwe4968.github.io/zwe_pyae_aung_portfolio/
// — a subpath, not the domain root — so every asset URL must be prefixed with the
// repo name there or they 404 (the classic GH Pages "blank page" cause). Vercel and
// Netlify, on the other hand, serve at their own root, where that same prefix would
// break every asset instead. `base` can't satisfy both at once with one fixed value,
// so it's keyed off the build mode: `npm run build` (default, used by Vercel/Netlify)
// stays at "/", and `npm run build:ghpages` (used by the gh-pages deploy script) gets
// the subpath. main.tsx's router `basename` and cvData.ts's résumé link both read
// import.meta.env.BASE_URL, so they automatically follow whichever mode built them.
export default defineConfig(({ mode }) => ({
  base: mode === 'ghpages' ? '/zwe_pyae_aung_portfolio/' : '/',
  plugins: [react()],
}))
