import { FC, useEffect } from 'react'
import styled from 'styled-components'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import { useTranslate } from '../../hooks/useTranslate'

const MainbarContainer = styled.div`
  background: var(--bg-main);
  width: 100%;
  //transition: 250ms;
  z-index: 2;
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  overflow: hidden;
`

export const Mainbar: FC = () => {
  const [theme, setTheme] = useLocalStorage('dark', 'theme')
  const { languages, setLanguage } = useTranslate()

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  const setLanguageHelper = code => {
    setLanguage(code)
  }

  useEffect(() => {
    document.body.setAttribute('data-theme', theme)
  }, [theme])

  return (
    <MainbarContainer>
      <div onClick={() => setLanguageHelper(languages.en.code)}>{languages.en.name}</div>
      <div onClick={() => setLanguageHelper(languages.ru.code)}>{languages.ru.name}</div>

      <div onClick={toggleTheme}>
        <h4>Toggle theme mode</h4>
      </div>
    </MainbarContainer>
  )
}

export default Mainbar
