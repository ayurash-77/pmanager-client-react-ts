import { FC, useEffect, useState } from 'react'
import styled from 'styled-components'
import { Grid } from '../components/ui'
import { ToolButton, ToolButtonGroup, FlexRow } from '../components/ui'
import Loader from '../components/ui/Loader'
import { useTranslate } from '../hooks/useTranslate'

import { useLoginMutation } from '../store/api/auth.api'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { setAuthUser } from '../store/reducers/user.reducer'
import * as ToolbarIcons from '../assets/icons/toolbar-icons'
import { ErrorList } from '../components/errors/ErrorList'
import { FlexColumn, Button, Input } from '../components/ui'
import { setThemeMode } from '../store/reducers/ui.reducer'
import { Spacer } from '../components/ui/Spacer'

const LoginPageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow: auto;
  background: var(--menubar-bg);
`

const LoginContainer = styled.div`
  text-align: center;
  width: 360px;
  height: 340px;
  background: var(--main-bg);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
  border-radius: 8px;
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: min-content 0.55fr auto 0.5fr;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: auto;
  padding: 10px;
`
const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const LoginPage: FC = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [login, { data: user, isLoading, error }] = useLoginMutation()
  const dispatch = useAppDispatch()

  const loaderJsx = isLoading && <Loader size={32} />
  const errorJsx = ErrorList(error && 'data' in error ? error.data.message : [])

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

  const { darkMode } = useAppSelector(state => state.ui.theme)
  const { language, setLanguage, text } = useTranslate()

  useEffect(() => {
    document.body.setAttribute('darkMode', darkMode.toString())
    if (user && user.token) {
      dispatch(setAuthUser(user))
    }
  }, [darkMode, dispatch, user])

  return (
    <LoginPageContainer>
      <LoginContainer>
        <HeaderContainer>
          <h3 style={{ marginLeft: 5 }}>PManager</h3>
          <FlexRow>
            <ToolButtonGroup>
              <ToolButton
                icon={<ToolbarIcons.LangEn />}
                selected={language === 'en'}
                onClick={() => setLanguage('en')}
              />
              <ToolButton
                icon={<ToolbarIcons.LangRu />}
                selected={language === 'ru'}
                onClick={() => setLanguage('ru')}
              />
            </ToolButtonGroup>
            <ToolButtonGroup>
              <ToolButton
                icon={<ToolbarIcons.Moon />}
                selected={darkMode}
                onClick={() => dispatch(setThemeMode(true))}
              />
              <ToolButton
                icon={<ToolbarIcons.Sun />}
                selected={!darkMode}
                onClick={() => dispatch(setThemeMode(false))}
              />
            </ToolButtonGroup>
          </FlexRow>
        </HeaderContainer>

        <FlexColumn vAlign="center">
          <h2>{text.app.login} </h2>
        </FlexColumn>

        <form onSubmit={onSubmitHandler}>
          <Grid cols={'auto'}>
            <FlexColumn gap={5}>
              <Input
                width={'100%'}
                variant={'normal'}
                placeholder={text.user.username}
                value={username}
                onChange={onChangeUsernameHandler}
                autoFocus={true}
              />
              <Input
                width={'100%'}
                variant={'normal'}
                type={'password'}
                placeholder={text.user.password}
                value={password}
                onChange={onChangePasswordHandler}
              />
            </FlexColumn>
            <Spacer height={30} />
            <Button variant={'normal'} width={'100%'}>
              {text.actions.enter}
            </Button>
          </Grid>
        </form>

        <FlexColumn>
          {loaderJsx}
          {errorJsx}
        </FlexColumn>
      </LoginContainer>
    </LoginPageContainer>
  )
}

export default LoginPage
