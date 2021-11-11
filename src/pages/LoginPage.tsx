import { ChangeEvent, FC, useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import styled from 'styled-components'
import { Grid, Rows, ToolbarContainer } from '../components/ui/Containers'
import { InputPass, InputText } from '../components/ui/Inputs'
import { Button } from '../components/ui/Buttons'
import { ToolButton } from '../components/ui/ToolButton'
import { useLocalStorage } from '../hooks/useLocalStorage'
import Loader from '../components/ui/Loader'
import { useTranslate } from '../hooks/useTranslate'

import { LoginRequest, useLoginMutation } from '../services/authApi'
import { useGetUsersQuery } from '../services/usersApi'
import { useAppDispatch } from '../hooks/redux'

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

  const {
    data: users = [],
    isLoading: isUsersLoading,
    error: errorUsers,
  } = useGetUsersQuery({ offset: 0, limit: 10 })

  // @ts-ignore
  const errorUsersMessage: string = errorUsers && errorUsers.data.message

  // const { data: auth, isFetching, status, isLoading, error: errorAuth } = useAuthQuery({})

  // @ts-ignore
  // const errorAuthMessage: string = errorAuth && errorAuth.data.message

  const dispatch = useAppDispatch()
  const { push } = useHistory()

  const [formState, setFormState] = useState<LoginRequest>({
    username: '',
    password: '',
  })

  const [login, { isLoading }] = useLoginMutation()

  const handleChange = ({ target: { name, value } }: ChangeEvent<HTMLInputElement>) =>
    setFormState(prev => ({ ...prev, [name]: value }))

  const onSubmitHandler = async e => {
    e.preventDefault()

    try {
      await login(formState).unwrap()
      push('/')
    } catch (err) {
      console.log(err.message)
    }

    console.log(users)
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
          <h2>{text.app.login} </h2>
        </Rows>

        <Rows vAlign="center">
          <form onSubmit={onSubmitHandler}>
            <Grid cols="auto" gapRow={10}>
              <Grid cols="auto" marginTop={20} textAlign="right">
                <InputText
                  // label={text.user.email}
                  onChange={handleChange}
                  autoFocus
                  value={email}
                  placeholder={text.user.email}
                />
                <InputPass
                  // label={text.user.password}
                  onChange={handleChange}
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
          {isUsersLoading && <Loader size={32} />}
          {errorUsersMessage && <div className="error">{errorUsersMessage}</div>}
          {/* {errorAuthMessage && <div className="error">{errorAuthMessage}</div>} */}
        </Rows>
      </LoginContainer>
    </LoginPageContainer>
  )
}

export default LoginPage
