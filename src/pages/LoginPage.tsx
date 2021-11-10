import { FC, useEffect, useState } from 'react'
import styled from 'styled-components'
import { Grid, Rows, ToolbarContainer } from '../components/ui/Containers'
import { InputPass, InputText } from '../components/ui/Inputs'
import { Button } from '../components/ui/Buttons'
import { ToolButton } from '../components/ui/ToolButton'
import { useLocalStorage } from '../hooks/useLocalStorage'
import Loader from '../components/ui/Loader'
import { useTranslate } from '../hooks/useTranslate'

import { useAuthQuery } from '../services/authApi'

const LoginPageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow: auto;
  background: var(--navbar-bg);
`

const LoginContainer = styled.div`
  width: 360px;
  height: 340px;
  background: var(--bg-main);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
  border-radius: 8px;
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: min-content 0.55fr auto 0.5fr;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: auto;
`
const HeaderContainer = styled.div`
  display: flex;
  margin: 10px;
  align-items: center;
  justify-content: space-between;
`

const LoginPage: FC = () => {
  type Err = {
    status: number
    message: string
  }

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // const { data, isFetching, status, isLoading, error } = useGetUsersQuery({ offset: 0, limit: 10 })
  const { data, isFetching, status, isLoading, error } = useAuthQuery({})

  // @ts-ignore
  const errorMessage: string = error && error.data.message

  const onSubmitHandler = e => {
    e.preventDefault()
    console.log(errorMessage)
  }
  const onChangeEmailHandler = e => {
    const val = e.target.value !== '' ? e.target.value : ''
    setEmail(val)
  }
  const onChangePasswordHandler = e => {
    const val = e.target.value !== '' ? e.target.value : ''
    setPassword(val)
  }

  const [theme, setTheme] = useLocalStorage('dark', 'theme')
  const toggleTheme = theme => {
    setTheme(theme)
  }

  const { language, setLanguage, text } = useTranslate()
  const setLanguageHelper = code => {
    setLanguage(code)
  }

  useEffect(() => {
    document.body.setAttribute('data-theme', theme)
  }, [theme])

  const loading = false

  return (
    <LoginPageContainer>
      <LoginContainer>
        <HeaderContainer>
          <h3 style={{ marginLeft: 5 }}>PManager</h3>
          <ToolbarContainer>
            <ToolButton
              icon="LangEn"
              rounded="left"
              selected={language === 'en'}
              action={() => setLanguageHelper('en')}
            />
            <ToolButton
              icon="LangRu"
              rounded="right"
              selected={language === 'ru'}
              action={() => setLanguageHelper('ru')}
            />
            <ToolButton
              icon="Moon"
              rounded="left"
              selected={theme === 'dark'}
              action={() => toggleTheme('dark')}
            />
            <ToolButton
              icon="Sun"
              rounded="right"
              selected={theme === 'light'}
              action={() => toggleTheme('light')}
            />
          </ToolbarContainer>
        </HeaderContainer>

        <Rows vAlign="center">
          <h2>{text.app.login}</h2>
        </Rows>

        <Rows vAlign="center">
          <form onSubmit={onSubmitHandler}>
            <Grid cols="auto" gapRow={10}>
              <Grid cols="auto" marginTop={20} textAlign="right">
                <InputText
                  // label={text.user.email}
                  onChange={onChangeEmailHandler}
                  autoFocus
                  value={email}
                  placeholder={text.user.email}
                />
                <InputPass
                  // label={text.user.password}
                  onChange={onChangePasswordHandler}
                  value={password}
                  placeholder={text.user.password}
                />
              </Grid>

              <Grid cols="auto" textAlign="center">
                <Button type="submit" margin="10px 0" onClick={undefined}>
                  {text.buttons.enter}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Rows>
        <Rows vAlign="center" padding={10}>
          {isLoading && <Loader size={32} />}
          {error && <div className="error">{errorMessage}</div>}
        </Rows>
      </LoginContainer>
    </LoginPageContainer>
  )
}

export default LoginPage
