import { useTranslation } from 'react-i18next'
import type { ProjectCategory } from '../types'

interface ProjectFiltersProps {
  available: ProjectCategory[]
  active: ProjectCategory | 'all'
  onChange: (category: ProjectCategory | 'all') => void
}

export default function ProjectFilters({ available, active, onChange }: ProjectFiltersProps) {
  const { t } = useTranslation()
  const filters: (ProjectCategory | 'all')[] = ['all', ...available]

  return (
    <div className="flex flex-wrap gap-3 mb-10" role="tablist" aria-label="Filter projects by category">
      {filters.map((cat) => (
        <button
          key={cat}
          role="tab"
          aria-selected={active === cat}
          onClick={() => onChange(cat)}
          className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
            active === cat
              ? 'bg-primary-600 text-white border-primary-600 shadow-md shadow-primary-600/25'
              : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-primary-400 hover:text-primary-600 dark:hover:text-primary-400'
          }`}
        >
          {t(`projects.filters.${cat}`)}
        </button>
      ))}
    </div>
  )
}
