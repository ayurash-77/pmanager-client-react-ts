import { LoginForm } from 'entities/users/auth/LoginForm'
import { FC, useEffect } from 'react'
import * as ToolbarIcons from 'assets/icons/toolbar-icons'
import { setThemeMode } from 'store/reducers/ui.reducer'
import { useAppDispatch, useAppSelector } from 'hooks/redux'
import { useTranslate } from 'hooks/useTranslate'
import { ToolButton, ToolButtonGroup } from 'components/ui'
import css from './LoginPage.module.scss'

export const LoginPage: FC = () => {
  const { darkMode } = useAppSelector(state => state.ui.theme)
  const { text, language, setLanguage } = useTranslate()

  const dispatch = useAppDispatch()

  useEffect(() => {
    document.body.setAttribute('darkMode', darkMode.toString())
  }, [darkMode])

  return (
    <div className={css.loginPageContainer}>
      <div className={css.loginBoxContainer}>
        <div className={'flex justify-center'}>
          <div className={css.headerTitle}>PManager</div>
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
          <div className={'w-2'} />
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
        </div>

        <div className={css.formTitle}>{text.app.login}</div>

        <LoginForm />
      </div>
    </div>
  )
}
