import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Moon, Sun, Network } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useTheme } from '../context/ThemeContext.tsx'
import { navLinks, personalInfo } from '../data/cvData.ts'
import LanguageSwitcher from './LanguageSwitcher.tsx'

export default function Navbar() {
  const { t } = useTranslation()
  const { theme, toggleTheme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass shadow-md py-3' : 'py-5 bg-transparent'
      }`}
    >
      <nav className="w-full px-4 sm:px-6 lg:px-8 xl:px-10 flex items-center justify-between gap-3">
        <a
          href="#home"
          className="flex items-center gap-2 font-bold text-lg text-slate-900 dark:text-white shrink-0 whitespace-nowrap"
        >
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-600 text-white">
            <Network size={18} />
          </span>
          <span className="hidden sm:inline">{personalInfo.name}</span>
        </a>

        <div className="hidden xl:flex items-center gap-5 2xl:gap-7 min-w-0">
          {navLinks.map((link) => (
            <a
              key={link.key}
              href={link.href}
              className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors whitespace-nowrap shrink-0"
            >
              {t(`nav.${link.key}`)}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <LanguageSwitcher />

          <button
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
            className="h-10 w-10 flex items-center justify-center rounded-full border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <button
            onClick={() => setIsOpen((o) => !o)}
            aria-label="Toggle navigation menu"
            className="xl:hidden h-10 w-10 flex items-center justify-center rounded-full border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300"
          >
            {isOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="xl:hidden glass mt-2 overflow-hidden"
          >
            <div className="flex flex-col px-6 py-4 gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.key}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-sm font-medium text-slate-700 dark:text-slate-200 hover:text-primary-600 dark:hover:text-primary-400"
                >
                  {t(`nav.${link.key}`)}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
