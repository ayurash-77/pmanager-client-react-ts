import { FC, useEffect } from 'react'
import styled from 'styled-components'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import { useTranslate } from '../../hooks/useTranslate'
import Loader from '../ui/Loader'
import { useGetUsersQuery } from '../../services/usersApi'

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

  const {
    data: users = [],
    isError: isUsersError,
    isLoading: isUsersLoading,
  } = useGetUsersQuery({ offset: 0, limit: 10 })

  return (
    <MainbarContainer>
      <div onClick={() => setLanguageHelper(languages.en.code)}>{languages.en.name}</div>
      <div onClick={() => setLanguageHelper(languages.ru.code)}>{languages.ru.name}</div>
      <div style={{ margin: 10 }} onClick={toggleTheme}>
        <h4>Toggle theme mode</h4>
      </div>
      Data:
      {isUsersError && <h4>error</h4>}
      {isUsersLoading && <Loader size={32} />}
      {users.length > 0 &&
        users.map(item => (
          <div key={item.id}>
            <div style={{ marginTop: 10 }}>Email: {item.email}</div>
            {item.roles.map(role => (
              <div key={role.id}>Role: {role.name}</div>
            ))}
          </div>
        ))}
    </MainbarContainer>
  )
}

export default Mainbar
