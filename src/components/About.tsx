import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Languages, Sparkles } from 'lucide-react'
import SectionWrapper from './SectionWrapper.tsx'
import { careerObjective, aboutStrengths, languages, personalInfo } from '../data/cvData.ts'

export default function About() {
  const { t } = useTranslation()

  return (
    <SectionWrapper id="about">
      <div className="section-container">
        <h2 className="section-title">{t('about.title')}</h2>
        <p className="section-subtitle">{t('about.subtitle')}</p>

        <div className="grid lg:grid-cols-2 gap-10">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">{t('about.careerObjective')}</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-8">{careerObjective}</p>

            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <Sparkles size={20} className="text-primary-600 dark:text-primary-400" />
              {t('about.strengths')}
            </h3>
            <ul className="space-y-3">
              {aboutStrengths.map((strength) => (
                <li key={strength} className="flex items-start gap-3 text-slate-600 dark:text-slate-400">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-primary-500 shrink-0" />
                  {strength}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="card p-8"
          >
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
              <Languages size={20} className="text-primary-600 dark:text-primary-400" />
              {t('about.languages')}
            </h3>
            <div className="space-y-5">
              {languages.map((lang) => (
                <div key={lang.name}>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="font-medium text-slate-700 dark:text-slate-200">{lang.name}</span>
                    <span className="text-slate-400 dark:text-slate-500">{lang.level}</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-primary-500 to-primary-600"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${lang.percent}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease: 'easeOut' }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800 text-sm text-slate-500 dark:text-slate-400">
              <p>📍 {personalInfo.address}</p>
            </div>
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  )
}
