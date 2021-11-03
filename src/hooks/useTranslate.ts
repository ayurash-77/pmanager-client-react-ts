import { Dispatch } from 'react'
import { useTranslation } from 'react-i18next'
import en from '../translations/en.json'
import ru from '../translations/ru.json'

const translations = { en, ru }

const languages = {
  en: { code: 'en', name: translations.en.name },
  ru: { code: 'ru', name: translations.ru.name },
}

export function useTranslate(): {
  text: typeof translations.en
  languages: typeof languages
  setLanguage: Dispatch<any>
  language: string
} {
  const { i18n } = useTranslation()
  const setLanguage = (code: string) => {
    i18n.changeLanguage(code)
  }
  const language = i18n.languages[0]
  const text = translations[i18n.languages[0]]

  return { text, languages, language, setLanguage }
}
