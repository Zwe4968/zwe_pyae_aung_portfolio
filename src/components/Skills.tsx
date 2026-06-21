import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Network, ShieldCheck, Cloud, Code2, Database, Terminal, Wrench, Globe, type LucideIcon } from 'lucide-react'
import SectionWrapper from './SectionWrapper.tsx'
import { skillCategories } from '../data/cvData.ts'

const icons: Record<string, LucideIcon> = { Network, ShieldCheck, Cloud, Code2, Database, Terminal, Wrench, Globe }

export default function Skills() {
  const { t } = useTranslation()

  return (
    <SectionWrapper id="skills" className="bg-slate-50 dark:bg-slate-900/40">
      <div className="section-container">
        <h2 className="section-title">{t('skills.title')}</h2>
        <p className="section-subtitle">{t('skills.subtitle')}</p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((cat, idx) => {
            const Icon = icons[cat.icon] || Wrench
            return (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.07 }}
                whileHover={{ y: -6 }}
                className="card p-6"
              >
                <div className="flex items-center gap-3 mb-5">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-100 dark:bg-primary-900/40 text-primary-600 dark:text-primary-400">
                    <Icon size={20} />
                  </span>
                  <h3 className="font-semibold text-slate-900 dark:text-white">
                    {t(`skills.categories.${cat.title}`, cat.title)}
                  </h3>
                </div>

                <div className="space-y-4">
                  {cat.skills.map((skill) => (
                    <div key={skill.name}>
                      <div className="flex justify-between text-xs mb-1.5">
                        <span className="text-slate-600 dark:text-slate-300 font-medium">{skill.name}</span>
                        <span className="text-slate-400 dark:text-slate-500">{skill.level}%</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                        <motion.div
                          className="h-full rounded-full bg-gradient-to-r from-primary-500 to-primary-600"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, ease: 'easeOut' }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </SectionWrapper>
  )
}
