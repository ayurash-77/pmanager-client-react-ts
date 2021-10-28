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
  const { translate, setLanguage, languages } = useTranslate()
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  useEffect(() => {
    document.body.setAttribute('data-theme', theme)
  }, [theme])

  return (
    <MainbarContainer>
      <div onClick={() => setLanguage(languages.en)}>English</div>
      <div onClick={() => setLanguage(languages.ru)}>Русский</div>
      <div onClick={toggleTheme}>theme</div>
      <h4>{translate.allProjects}</h4>
      <h4>{translate.favorites}</h4>
    </MainbarContainer>
  )
}

export default Mainbar
