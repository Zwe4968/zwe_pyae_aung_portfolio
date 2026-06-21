import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { FolderGit2, Star, GitFork, Users } from 'lucide-react'
import SectionWrapper from './SectionWrapper.tsx'
import { useGithubProfile } from '../hooks/useGithubProfile.ts'
import { GITHUB_USERNAME } from '../lib/github.ts'

const LANGUAGE_COLORS: Record<string, string> = {
  Vue: '#41b883',
  Python: '#3572A5',
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  HTML: '#e34c26',
  CSS: '#563d7c',
  PHP: '#4F5D95',
  'C++': '#f34b7d',
}

export default function GithubStats() {
  const { t } = useTranslation()
  const { user, totalStars, totalForks, publicRepoCount, languageBytes } = useGithubProfile()

  const topLanguages = useMemo(() => {
    const total = Object.values(languageBytes).reduce((s, v) => s + v, 0)
    if (!total) return []
    return Object.entries(languageBytes)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6)
      .map(([name, bytes]) => ({ name, percent: Math.round((bytes / total) * 100) }))
  }, [languageBytes])

  const stats = [
    { icon: FolderGit2, label: t('githubStats.repos'), value: publicRepoCount },
    { icon: Star, label: t('githubStats.stars'), value: totalStars },
    { icon: GitFork, label: t('githubStats.forks'), value: totalForks },
    ...(user ? [{ icon: Users, label: t('githubStats.followers'), value: user.followers }] : []),
  ]

  return (
    <SectionWrapper id="github-stats">
      <div className="section-container">
        <h2 className="section-title">{t('githubStats.title')}</h2>
        <p className="section-subtitle">{t('githubStats.subtitle')}</p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 mb-12">
          {stats.map(({ icon: Icon, label, value }, idx) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.07 }}
              className="card p-6 text-center"
            >
              <Icon className="mx-auto mb-2 text-primary-600 dark:text-primary-400" size={24} />
              <p className="text-2xl font-bold text-slate-900 dark:text-white">{value}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{label}</p>
            </motion.div>
          ))}
        </div>

        {topLanguages.length > 0 && (
          <div className="card p-6 mb-10">
            <h3 className="font-semibold text-slate-900 dark:text-white mb-5">{t('githubStats.topLanguages')}</h3>
            <div className="space-y-4">
              {topLanguages.map((lang) => (
                <div key={lang.name}>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="font-medium text-slate-700 dark:text-slate-200">{lang.name}</span>
                    <span className="text-slate-400 dark:text-slate-500">{lang.percent}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ backgroundColor: LANGUAGE_COLORS[lang.name] ?? '#2e7df0' }}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${lang.percent}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease: 'easeOut' }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="card p-6">
          <h3 className="font-semibold text-slate-900 dark:text-white mb-5">{t('githubStats.contributionGraph')}</h3>
          <div className="overflow-x-auto">
            <img
              src={`https://ghchart.rshah.org/2e7df0/${GITHUB_USERNAME}`}
              alt="GitHub contribution graph"
              loading="lazy"
              className="min-w-[700px] w-full"
            />
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}
