import { Dispatch } from 'react'
import { useLocalStorage } from './useLocalStorage'

// interface ITranslation {
//   [key: string]: string
// }

const languages = {
  en: 'en',
  ru: 'ru',
}

const translations = {
  [languages.en]: {
    allProjects: 'All projects',
    favorites: 'Favorites',
  },
  [languages.ru]: {
    allProjects: 'Все проекты',
    favorites: 'Избранное',
  },
}

export function useTranslate(): {
  language: string
  // translate: { [language]: { [key: string]: string } }
  translate: any
  languages: typeof languages
  setLanguage: Dispatch<any>
} {
  const [language, setLanguage] = useLocalStorage(languages.en, 'language')

  return { translate: translations[language], languages, language, setLanguage }
}
