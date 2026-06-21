import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Trophy } from 'lucide-react'
import SectionWrapper from './SectionWrapper.tsx'
import { achievements } from '../data/cvData.ts'

export default function Achievements() {
  const { t } = useTranslation()

  return (
    <SectionWrapper id="achievements" className="bg-slate-50 dark:bg-slate-900/40">
      <div className="section-container">
        <h2 className="section-title">{t('achievements.title')}</h2>
        <p className="section-subtitle">{t('achievements.subtitle')}</p>

        <div className="grid sm:grid-cols-2 gap-6">
          {achievements.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              whileHover={{ y: -6 }}
              className="card p-6 flex gap-4"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-100 dark:bg-primary-900/40 text-primary-600 dark:text-primary-400">
                <Trophy size={22} />
              </span>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-slate-900 dark:text-white">{item.title}</h3>
                  <span className="text-xs text-slate-400 dark:text-slate-500">· {item.year}</span>
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}
