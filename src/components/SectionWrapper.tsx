import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface SectionWrapperProps {
  id: string
  className?: string
  children: ReactNode
}

export default function SectionWrapper({ id, className = '', children }: SectionWrapperProps) {
  return (
    <motion.section
      id={id}
      className={`py-20 sm:py-28 ${className}`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      {children}
    </motion.section>
  )
}
