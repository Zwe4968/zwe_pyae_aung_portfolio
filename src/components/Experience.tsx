import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Briefcase, CheckCircle2 } from 'lucide-react'
import SectionWrapper from './SectionWrapper.tsx'
import { experience } from '../data/cvData.ts'

export default function Experience() {
  const { t } = useTranslation()

  return (
    <SectionWrapper id="experience">
      <div className="section-container">
        <h2 className="section-title">{t('experience.title')}</h2>
        <p className="section-subtitle">{t('experience.subtitle')}</p>

        <div className="relative pl-8 sm:pl-10">
          <div className="absolute left-2.5 sm:left-3.5 top-2 bottom-2 w-0.5 bg-primary-200 dark:bg-primary-900" />

          {experience.map((job, idx) => (
            <motion.div
              key={`${job.role}-${job.company}`}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="relative mb-10 last:mb-0"
            >
              <span className="absolute -left-8 sm:-left-10 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-primary-600 text-white ring-4 ring-white dark:ring-slate-950">
                <Briefcase size={14} />
              </span>
              <div className="card p-6">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{job.role}</h3>
                  <span className="text-xs font-medium px-3 py-1 rounded-full bg-primary-100 text-primary-700 dark:bg-primary-900/40 dark:text-primary-300">
                    {job.period}
                  </span>
                </div>
                <p className="text-primary-600 dark:text-primary-400 font-medium mb-4">{job.company}</p>
                <ul className="space-y-2">
                  {job.duties.map((duty) => (
                    <li key={duty} className="flex items-start gap-2.5 text-sm text-slate-600 dark:text-slate-400">
                      <CheckCircle2 size={16} className="text-primary-500 mt-0.5 shrink-0" />
                      {duty}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}
