import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'
import en from './locales/en.json'
import my from './locales/my.json'
import th from './locales/th.json'
import zh from './locales/zh.json'

export const SUPPORTED_LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'my', label: 'မြန်မာ' },
  { code: 'th', label: 'ไทย' },
  { code: 'zh', label: '中文' },
] as const

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      my: { translation: my },
      th: { translation: th },
      zh: { translation: zh },
    },
    fallbackLng: 'en',
    supportedLngs: ['en', 'my', 'th', 'zh'],
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: 'i18nextLng',
    },
    interpolation: { escapeValue: false },
  })

export default i18n
