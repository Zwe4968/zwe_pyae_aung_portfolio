import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Download, Mail, ArrowDown, Github, Linkedin } from 'lucide-react'
import { personalInfo } from '../data/cvData.ts'
import { GITHUB_USERNAME } from '../lib/github.ts'

export default function Hero() {
  const { t } = useTranslation()

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-28 pb-16 overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary-50 via-white to-white dark:from-slate-950 dark:via-slate-900 dark:to-slate-950" />
      <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-primary-400/20 blur-3xl animate-pulse-slow -z-10" />
      <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-primary-600/20 blur-3xl animate-pulse-slow -z-10" />

      <div className="section-container grid lg:grid-cols-[1.2fr,0.8fr] gap-12 items-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-primary-100 text-primary-700 dark:bg-primary-900/40 dark:text-primary-300 mb-6">
            {t('hero.availableBadge')}
          </span>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight mb-4">
            Hi, I'm <span className="text-primary-600 dark:text-primary-400">{personalInfo.name}</span>
          </h1>

          <p className="text-xl sm:text-2xl font-medium text-slate-600 dark:text-slate-300 mb-6">{personalInfo.title}</p>

          <p className="text-base sm:text-lg text-slate-500 dark:text-slate-400 max-w-2xl leading-relaxed mb-10">
            {personalInfo.introduction}
          </p>

          <div className="flex flex-wrap gap-4">
            <a href={personalInfo.resumeFile} download className="btn-primary">
              <Download size={18} />
              {t('hero.downloadResume')}
            </a>
            <a href="#contact" className="btn-secondary">
              <Mail size={18} />
              {t('hero.contactMe')}
            </a>
            <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="btn-secondary">
              <Github size={18} />
              {t('hero.viewGithub')}
            </a>
            {personalInfo.linkedin && (
              <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="btn-secondary">
                <Linkedin size={18} />
                {t('hero.connectLinkedin')}
              </a>
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex justify-center lg:justify-end"
        >
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary-400 to-primary-700 blur-2xl opacity-40 animate-pulse-slow" />
            <div className="relative h-64 w-64 sm:h-80 sm:w-80 rounded-full glass shadow-2xl flex items-center justify-center animate-float overflow-hidden">
              <img
                src={`https://github.com/${GITHUB_USERNAME}.png`}
                alt={personalInfo.name}
                width={320}
                height={320}
                loading="eager"
                className="h-[92%] w-[92%] rounded-full object-cover"
              />
            </div>
          </div>
        </motion.div>
      </div>

      <motion.a
        href="#about"
        aria-label="Scroll to About section"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-slate-400 dark:text-slate-500"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.8 }}
      >
        <ArrowDown size={26} />
      </motion.a>
    </section>
  )
}
