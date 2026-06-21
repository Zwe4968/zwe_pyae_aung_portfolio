import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import { ThemeProvider } from './context/ThemeContext.tsx'
import './i18n/index.ts'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* basename must match vite.config.ts's `base` — otherwise React Router
        resolves routes against "/" while the app is actually served from
        "/zwe_pyae_aung_portfolio/", which is a common cause of a blank page
        on GitHub Pages. import.meta.env.BASE_URL keeps both in sync. */}
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
)
