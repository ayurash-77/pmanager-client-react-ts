import { FC, useEffect } from 'react'
import { FlexColumn } from 'components/ui'
import { useTranslate } from 'hooks/useTranslate'
import { useAppSelector } from '../../hooks/redux'
import css from './LoginPage.module.scss'
import { LoginHeader } from './LoginHeader'
import { LoginForm } from './LoginForm'

export const LoginPage: FC = () => {
  const { darkMode } = useAppSelector(state => state.ui.theme)
  const { text } = useTranslate()

  useEffect(() => {
    document.body.setAttribute('darkMode', darkMode.toString())
  }, [darkMode])

  return (
    <div className={css.pageContainer}>
      <div className={css.loginContainer}>
        <LoginHeader darkMode={darkMode} />

        <FlexColumn vAlign="center">
          <h2>{text.app.login} </h2>
        </FlexColumn>

        <LoginForm />
      </div>
    </div>
  )
}
