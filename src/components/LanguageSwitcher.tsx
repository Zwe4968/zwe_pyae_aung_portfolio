import { useState, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Globe, Check } from 'lucide-react'
import { SUPPORTED_LANGUAGES } from '../i18n'

export default function LanguageSwitcher() {
  const { i18n } = useTranslation()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('click', onClickOutside)
    return () => document.removeEventListener('click', onClickOutside)
  }, [])

  const current = SUPPORTED_LANGUAGES.find((l) => l.code === i18n.language) ?? SUPPORTED_LANGUAGES[0]

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Change language"
        aria-haspopup="listbox"
        aria-expanded={open}
        className="h-10 px-3 flex items-center gap-1.5 rounded-full border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors text-sm font-medium"
      >
        <Globe size={16} />
        <span>{current.label}</span>
      </button>

      {open && (
        <div
          role="listbox"
          className="absolute right-0 mt-2 w-36 glass rounded-xl shadow-xl overflow-hidden z-50"
        >
          {SUPPORTED_LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              role="option"
              aria-selected={lang.code === i18n.language}
              onClick={() => {
                i18n.changeLanguage(lang.code)
                setOpen(false)
              }}
              className="w-full flex items-center justify-between px-4 py-2.5 text-sm text-slate-700 dark:text-slate-200 hover:bg-primary-50 dark:hover:bg-primary-900/30 transition-colors"
            >
              {lang.label}
              {lang.code === i18n.language && <Check size={14} className="text-primary-600 dark:text-primary-400" />}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
