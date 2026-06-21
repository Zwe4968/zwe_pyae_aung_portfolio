import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import SectionWrapper from './SectionWrapper.tsx'
import ProjectCard from './ProjectCard.tsx'
import ProjectFilters from './ProjectFilters.tsx'
import { useProjects } from '../hooks/useProjects.ts'
import type { ProjectCategory } from '../types'

export default function Projects() {
  const { t } = useTranslation()
  const { projects } = useProjects()
  const [activeFilter, setActiveFilter] = useState<ProjectCategory | 'all'>('all')

  const availableCategories = useMemo(() => {
    const set = new Set<ProjectCategory>()
    projects.forEach((p) => p.categories.forEach((c) => set.add(c)))
    const order: ProjectCategory[] = ['networking', 'web', 'database', 'iot', 'ai-ml', 'security', 'other']
    return order.filter((c) => set.has(c))
  }, [projects])

  const filteredProjects =
    activeFilter === 'all' ? projects : projects.filter((p) => p.categories.includes(activeFilter))

  return (
    <SectionWrapper id="projects" className="bg-slate-50 dark:bg-slate-900/40">
      <div className="section-container">
        <h2 className="section-title">{t('projects.title')}</h2>
        <p className="text-slate-500 dark:text-slate-400 mb-4 max-w-2xl">{t('projects.subtitle')}</p>
        <span className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300 mb-10">
          {t('projects.curatedNote')}
        </span>

        <ProjectFilters available={availableCategories} active={activeFilter} onChange={setActiveFilter} />

        {filteredProjects.length === 0 ? (
          <p className="text-slate-500 dark:text-slate-400 py-10">{t('projects.noResults')}</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, idx) => (
              <ProjectCard key={project.name} project={project} index={idx} />
            ))}
          </div>
        )}
      </div>
    </SectionWrapper>
  )
}
