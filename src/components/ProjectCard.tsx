import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Github, ExternalLink, CheckCircle2, Star, GitFork, Calendar, GitBranch, Sparkles } from 'lucide-react'
import type { Project } from '../types'

function formatDate(iso: string, locale: string) {
  try {
    return new Date(iso).toLocaleDateString(locale, { year: 'numeric', month: 'short' })
  } catch {
    return iso.slice(0, 7)
  }
}

export default function ProjectCard({ project, index }: { project: Project; index: number }) {
  const { t, i18n } = useTranslation()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: Math.min(index, 6) * 0.06 }}
      whileHover={{ y: -6 }}
      className="card overflow-hidden flex flex-col"
    >
      <div className="relative aspect-[1200/630] bg-slate-100 dark:bg-slate-800 overflow-hidden">
        {project.featured && (
          <span className="absolute top-3 left-3 z-10 flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-full bg-primary-600 text-white shadow-md">
            <Sparkles size={12} /> {t('projects.featured')}
          </span>
        )}
        <img
          src={project.screenshotUrl}
          alt={`${project.title} repository preview`}
          loading="lazy"
          className="w-full h-full object-cover"
          onError={(e) => {
            ;(e.target as HTMLImageElement).style.display = 'none'
          }}
        />
      </div>

      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-semibold text-lg text-slate-900 dark:text-white capitalize">{project.title}</h3>
          {project.isFork && (
            <span className="flex items-center gap-1 text-[11px] px-2 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 shrink-0">
              <GitBranch size={12} /> {t('projects.fork')}
            </span>
          )}
        </div>

        <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-4">{project.description}</p>

        {project.features.length > 0 && (
          <ul className="space-y-1.5 mb-4">
            {project.features.map((f) => (
              <li key={f} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300">
                <CheckCircle2 size={14} className="text-primary-500 mt-0.5 shrink-0" />
                {f}
              </li>
            ))}
          </ul>
        )}

        <div className="flex flex-wrap gap-2 mb-5">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="text-xs px-2.5 py-1 rounded-full bg-primary-100 text-primary-700 dark:bg-primary-900/40 dark:text-primary-300"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-4 text-xs text-slate-400 dark:text-slate-500 mb-5">
          <span className="flex items-center gap-1">
            <Star size={13} /> {project.stars}
          </span>
          <span className="flex items-center gap-1">
            <GitFork size={13} /> {project.forks}
          </span>
          <span className="flex items-center gap-1">
            <Calendar size={13} /> {t('projects.lastUpdated')} {formatDate(project.updatedAt, i18n.language)}
          </span>
        </div>

        <div className="mt-auto flex gap-3">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
          >
            <Github size={16} /> {t('projects.viewGithub')}
          </a>
          {project.demoUrl ? (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              <ExternalLink size={16} /> {t('projects.liveDemo')}
            </a>
          ) : (
            <span className="flex items-center gap-1.5 text-sm text-slate-300 dark:text-slate-600 cursor-not-allowed">
              <ExternalLink size={16} /> {t('projects.noDemo')}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  )
}
