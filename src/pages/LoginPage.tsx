import { FC, useEffect, useState } from 'react'
import styled from 'styled-components'
import { Grid, Rows, ToolbarContainer } from '../components/ui/Containers'
import { InputPass, InputText } from '../components/ui/Inputs'
import { Button } from '../components/ui/Buttons'
import { ToolButton } from '../components/ui/ToolButton'
import { useLocalStorage } from '../hooks/useLocalStorage'
import Loader from '../components/ui/Loader'
import { useTranslate } from '../hooks/useTranslate'

import { useLoginMutation } from '../services/authApi'
import { useAppDispatch } from '../hooks/redux'
import { userSlice } from '../store/userSlice'
import * as ToolbarIcons from '../assets/icons/toolbar-icons'
import { ErrorList } from '../components/errors/ErrorList'

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
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [login, { data: user, isLoading, error }] = useLoginMutation()
  const { setAuthUser } = userSlice.actions
  const dispatch = useAppDispatch()

  const loaderJsx = isLoading && <Loader size={32} />
  const errors = error && 'data' in error ? error.data.message : []
  const errorJsx = ErrorList(errors)

  const onSubmitHandler = async e => {
    e.preventDefault()
    await login({ username, password })
  }

  const onChangeUsernameHandler = e => {
    const val = e.target.value !== '' ? e.target.value : ''
    setUsername(val)
  }
  const onChangePasswordHandler = e => {
    const val = e.target.value !== '' ? e.target.value : ''
    setPassword(val)
  }

  const [theme, setTheme] = useLocalStorage('dark', 'theme')
  const { language, setLanguage, text } = useTranslate()

  useEffect(() => {
    document.body.setAttribute('data-theme', theme)
    if (user && user.token) {
      dispatch(setAuthUser(user))
    }
  }, [dispatch, setAuthUser, theme, user])

  return (
    <LoginPageContainer>
      <LoginContainer>
        <HeaderContainer>
          <h3 style={{ marginLeft: 5 }}>PManager</h3>
          <ToolbarContainer>
            <ToolButton
              icon={<ToolbarIcons.LangEn />}
              rounded="left"
              selected={language === 'en'}
              onClick={() => setLanguage('en')}
            />
            <ToolButton
              icon={<ToolbarIcons.LangRu />}
              rounded="right"
              selected={language === 'ru'}
              onClick={() => setLanguage('ru')}
            />
            <ToolButton
              icon={<ToolbarIcons.Moon />}
              rounded="left"
              selected={theme === 'dark'}
              onClick={() => setTheme('dark')}
            />
            <ToolButton
              icon={<ToolbarIcons.Sun />}
              rounded="right"
              selected={theme === 'light'}
              onClick={() => setTheme('light')}
            />
          </ToolbarContainer>
        </HeaderContainer>

        <Rows vAlign="center">
          <h2>{text.app.login} </h2>
        </Rows>

        <Rows vAlign="center">
          <form onSubmit={onSubmitHandler}>
            <Grid cols="auto" gapRow={10}>
              <Grid cols="auto" marginTop={20} textAlign="right">
                <InputText
                  // label={text.user.email}
                  onChange={onChangeUsernameHandler}
                  autoFocus
                  value={username}
                  placeholder={text.user.username}
                />
                <InputPass
                  // label={text.user.password}
                  onChange={onChangePasswordHandler}
                  value={password}
                  placeholder={text.user.password}
                />
              </Grid>

              <Button type="submit" margin={'10px 0 0 0'}>
                {text.buttons.enter}
              </Button>
            </Grid>
          </form>
        </Rows>
        <Rows vAlign="center" padding={10}>
          {loaderJsx}
          {errorJsx}
        </Rows>
      </LoginContainer>
    </LoginPageContainer>
  )
}

export default LoginPage
