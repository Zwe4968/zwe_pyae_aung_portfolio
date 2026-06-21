import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { GraduationCap } from 'lucide-react'
import SectionWrapper from './SectionWrapper.tsx'
import { education } from '../data/cvData.ts'

export default function Education() {
  const { t } = useTranslation()

  return (
    <SectionWrapper id="education" className="bg-slate-50 dark:bg-slate-900/40">
      <div className="section-container">
        <h2 className="section-title">{t('education.title')}</h2>
        <p className="section-subtitle">{t('education.subtitle')}</p>

        <div className="relative pl-8 sm:pl-10">
          <div className="absolute left-2.5 sm:left-3.5 top-2 bottom-2 w-0.5 bg-primary-200 dark:bg-primary-900" />

          {education.map((edu, idx) => (
            <motion.div
              key={edu.school}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="relative mb-10 last:mb-0"
            >
              <span className="absolute -left-8 sm:-left-10 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-primary-600 text-white ring-4 ring-white dark:ring-slate-950">
                <GraduationCap size={14} />
              </span>
              <div className="card p-6">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{edu.degree}</h3>
                  <span className="text-xs font-medium px-3 py-1 rounded-full bg-primary-100 text-primary-700 dark:bg-primary-900/40 dark:text-primary-300">
                    {edu.period}
                  </span>
                </div>
                <p className="text-primary-600 dark:text-primary-400 font-medium mb-1">
                  {edu.school}
                  {edu.location ? `, ${edu.location}` : ''}
                </p>
                {edu.gpa && <p className="text-sm text-slate-500 dark:text-slate-400">GPA: {edu.gpa}</p>}
                {edu.note && <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">{edu.note}</p>}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}
