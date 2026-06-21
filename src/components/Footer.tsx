import { useTranslation } from 'react-i18next'
import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react'
import { personalInfo, navLinks } from '../data/cvData.ts'

export default function Footer() {
  const { t } = useTranslation()
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
      <div className="section-container py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="font-bold text-lg text-slate-900 dark:text-white">{personalInfo.name}</p>
            <p className="text-sm text-slate-500 dark:text-slate-400">{personalInfo.shortTitle}</p>
          </div>

          <div className="flex flex-wrap gap-5 justify-center">
            {navLinks.slice(0, 6).map((link) => (
              <a
                key={link.key}
                href={link.href}
                className="text-sm text-slate-500 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              >
                {t(`nav.${link.key}`)}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <a
              href={`mailto:${personalInfo.email}`}
              aria-label="Email"
              className="h-9 w-9 flex items-center justify-center rounded-full border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              <Mail size={16} />
            </a>
            {personalInfo.linkedin && (
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="h-9 w-9 flex items-center justify-center rounded-full border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              >
                <Linkedin size={16} />
              </a>
            )}
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="h-9 w-9 flex items-center justify-center rounded-full border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              <Github size={16} />
            </a>
            <a
              href="#home"
              aria-label={t('common.backToTop')}
              className="h-9 w-9 flex items-center justify-center rounded-full bg-primary-600 text-white hover:bg-primary-700 transition-colors"
            >
              <ArrowUp size={16} />
            </a>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 text-center text-xs text-slate-400 dark:text-slate-500">
          © {year} {personalInfo.name}. {t('footer.rights')}
        </div>
      </div>
    </footer>
  )
}
