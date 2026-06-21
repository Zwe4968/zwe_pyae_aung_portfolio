import { useState, type ChangeEvent, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Mail, Phone, MapPin, Github, Linkedin, Send } from 'lucide-react'
import SectionWrapper from './SectionWrapper.tsx'
import { personalInfo } from '../data/cvData.ts'

interface ContactDetail {
  icon: typeof Mail
  labelKey: 'email' | 'phone' | 'linkedin' | 'github' | 'location'
  value: string
  href: string | null
}

export default function Contact() {
  const { t } = useTranslation()
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState<string | null>(null)

  const contactDetails: ContactDetail[] = [
    { icon: Mail, labelKey: 'email', value: personalInfo.email, href: `mailto:${personalInfo.email}` },
    { icon: Phone, labelKey: 'phone', value: personalInfo.phone, href: `tel:${personalInfo.phone.replace(/\s/g, '')}` },
    ...(personalInfo.linkedin
      ? [{ icon: Linkedin, labelKey: 'linkedin' as const, value: personalInfo.linkedin.replace(/^https?:\/\//, ''), href: personalInfo.linkedin }]
      : []),
    { icon: Github, labelKey: 'github', value: personalInfo.github.replace(/^https?:\/\//, ''), href: personalInfo.github },
    { icon: MapPin, labelKey: 'location', value: personalInfo.location, href: null },
  ]

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const subject = encodeURIComponent(`Portfolio contact from ${form.name}`)
    const body = encodeURIComponent(`${form.message}\n\nFrom: ${form.name} (${form.email})`)
    window.location.href = `mailto:${personalInfo.email}?subject=${subject}&body=${body}`
    setStatus(t('contact.form.sending'))
  }

  return (
    <SectionWrapper id="contact" className="bg-slate-50 dark:bg-slate-900/40">
      <div className="section-container">
        <h2 className="section-title">{t('contact.title')}</h2>
        <p className="section-subtitle">{t('contact.subtitle')}</p>

        <div className="grid lg:grid-cols-2 gap-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            {contactDetails.map(({ icon: Icon, labelKey, value, href }) => {
              const content = (
                <div className="card p-5 flex items-center gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-100 dark:bg-primary-900/40 text-primary-600 dark:text-primary-400">
                    <Icon size={20} />
                  </span>
                  <div>
                    <p className="text-xs text-slate-400 dark:text-slate-500">{t(`contact.${labelKey}`)}</p>
                    <p className="text-sm font-medium text-slate-700 dark:text-slate-200">{value}</p>
                  </div>
                </div>
              )
              return href ? (
                <a key={labelKey} href={href} target="_blank" rel="noopener noreferrer" className="block">
                  {content}
                </a>
              ) : (
                <div key={labelKey}>{content}</div>
              )
            })}
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            onSubmit={handleSubmit}
            className="card p-7 space-y-4"
          >
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1.5">
                {t('contact.form.name')}
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={form.name}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder={t('contact.form.namePlaceholder')}
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1.5">
                {t('contact.form.email')}
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={form.email}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder={t('contact.form.emailPlaceholder')}
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1.5">
                {t('contact.form.message')}
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                value={form.message}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
                placeholder={t('contact.form.messagePlaceholder')}
              />
            </div>
            <button type="submit" className="btn-primary w-full justify-center">
              <Send size={18} />
              {t('contact.form.send')}
            </button>
            {status && <p className="text-sm text-primary-600 dark:text-primary-400 text-center">{status}</p>}
          </motion.form>
        </div>
      </div>
    </SectionWrapper>
  )
}
