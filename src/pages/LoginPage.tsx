import { FC, useEffect, useState } from 'react'
import styled from 'styled-components'
import { Grid, Rows, ToolbarContainer } from '../components/ui/Containers'
import { ToolButton } from '../components/ui/ToolButton'
import Loader from '../components/ui/Loader'
import { useTranslate } from '../hooks/useTranslate'

import { useLoginMutation } from '../store/api/auth.api'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { setAuthUser, userSlice } from '../store/reducers/user.reducer'
import * as ToolbarIcons from '../assets/icons/toolbar-icons'
import { ErrorList } from '../components/errors/ErrorList'
import { Button } from '../components/ui/Button'
import { setThemeMode } from '../store/reducers/ui.reducer'
import { appColors } from '../app/App.colors'
import { Input } from '../components/ui/Input'
import { IVariant } from '../components/ui/IVariant'
import { Spacer } from '../components/ui/Spacer'

const LoginPageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow: auto;
  background: ${appColors.menubar.BG};
`

const LoginContainer = styled.div`
  text-align: center;
  width: 360px;
  height: 340px;
  background: ${appColors.main.BG};
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
  //margin: 10px;
  align-items: center;
  justify-content: space-between;
`

const LoginPage: FC = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [variant, setVariant] = useState<IVariant>('normal')

  const [login, { data: user, isLoading, error, isError }] = useLoginMutation()
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
    if (user && user.token) {
      dispatch(setAuthUser(user))
    }
  }, [dispatch, user])

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
              selected={darkMode}
              onClick={() => dispatch(setThemeMode(true))}
            />
            <ToolButton
              icon={<ToolbarIcons.Sun />}
              rounded="right"
              selected={!darkMode}
              onClick={() => dispatch(setThemeMode(false))}
            />
          </ToolbarContainer>
        </HeaderContainer>

        {/* <Rows vAlign="center"> */}
        <h2>{text.app.login} </h2>
        {/* </Rows> */}

        <form onSubmit={onSubmitHandler}>
          <Grid cols="auto" gapRow={10}>
            <Grid cols="auto">
              <Input
                variant={'normal'}
                placeholder={text.user.username}
                value={username}
                onChange={onChangeUsernameHandler}
                autoFocus={true}
              />
              <Input
                variant={'normal'}
                type={'password'}
                placeholder={text.user.password}
                value={password}
                onChange={onChangePasswordHandler}
              />
            </Grid>
            <Spacer />
            <Button variant={'normal'}>{text.actions.enter}</Button>
          </Grid>
        </form>

        <Rows>
          {loaderJsx}
          {errorJsx}
        </Rows>
      </LoginContainer>
    </LoginPageContainer>
  )
}

export default LoginPage
