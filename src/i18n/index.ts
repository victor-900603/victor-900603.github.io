import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'
import en from './locales/en.json'
import zhTW from './locales/zh-TW.json'

export const SUPPORTED_LANGUAGES = ['zh-TW', 'en'] as const
export type Language = (typeof SUPPORTED_LANGUAGES)[number]

export const LANGUAGE_STORAGE_KEY = 'preferred-lang'

export function normalizeLanguage(value: string | undefined): Language {
  if (value && value.toLowerCase().startsWith('en')) {
    return 'en'
  }
  return 'zh-TW'
}

void i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      'zh-TW': { translation: zhTW },
      en: { translation: en },
    },
    fallbackLng: 'zh-TW',
    supportedLngs: SUPPORTED_LANGUAGES,
    load: 'currentOnly',
    interpolation: { escapeValue: false },
    detection: {
      order: ['localStorage', 'navigator'],
      lookupLocalStorage: LANGUAGE_STORAGE_KEY,
      caches: ['localStorage'],
    },
  })

if (typeof document !== 'undefined') {
  document.documentElement.lang = normalizeLanguage(i18n.language)
  i18n.on('languageChanged', (language) => {
    document.documentElement.lang = normalizeLanguage(language)
  })
}

export default i18n
