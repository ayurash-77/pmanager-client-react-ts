import { Center, Flex, Spacer } from '@chakra-ui/react'
import { FC, useEffect } from 'react'
import * as ToolbarIcons from 'assets/icons/toolbar-icons'
import { setThemeMode } from 'store/reducers/ui.reducer'
import { useAppDispatch, useAppSelector } from 'hooks/redux'
import { useTranslate } from 'hooks/useTranslate'
import { LoginForm } from 'components/features/login/LoginForm'
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
    <Center h={'80%'}>
      <div className={css.loginBoxContainer}>
        <Flex alignItems="center">
          <div className={css.headerTitle}>PManager</div>
          <Spacer />
          <Flex gap={2}>
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
          </Flex>
        </Flex>

        <Center className={css.formTitle}>{text.app.login}</Center>

        <LoginForm />
      </div>
    </Center>
  )
}
