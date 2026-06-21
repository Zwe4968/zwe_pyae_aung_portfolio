import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Award, BadgeCheck } from 'lucide-react'
import SectionWrapper from './SectionWrapper.tsx'
import { certifications } from '../data/cvData.ts'

export default function Certifications() {
  const { t } = useTranslation()

  return (
    <SectionWrapper id="certifications">
      <div className="section-container">
        <h2 className="section-title">{t('certifications.title')}</h2>
        <p className="section-subtitle">{t('certifications.subtitle')}</p>

        <div className="grid sm:grid-cols-2 gap-6">
          {certifications.map((cert, idx) => (
            <motion.div
              key={cert.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              whileHover={{ y: -6 }}
              className="card p-6 flex gap-4"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-100 dark:bg-primary-900/40 text-primary-600 dark:text-primary-400">
                <Award size={22} />
              </span>
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white mb-1">{cert.name}</h3>
                <p className="text-sm text-primary-600 dark:text-primary-400 font-medium mb-1">{cert.issuer}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">{cert.date}</p>
                {cert.credentialId && (
                  <p className="text-xs text-slate-400 dark:text-slate-500 flex items-center gap-1">
                    <BadgeCheck size={14} /> Credential ID: {cert.credentialId}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}
