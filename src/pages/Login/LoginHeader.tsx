import css from './LoginPage.module.scss'
import { FlexRow, ToolButton, ToolButtonGroup } from '../../components/ui'
import * as ToolbarIcons from '../../assets/icons/toolbar-icons'
import { FC } from 'react'
import { useTranslate } from '../../hooks/useTranslate'
import { useAppDispatch } from '../../hooks/redux'
import { setThemeMode } from '../../store/reducers/ui.reducer'

interface ILoginHeader {
  darkMode: boolean
}

export const LoginHeader: FC<ILoginHeader> = props => {
  const { darkMode } = props
  const { language, setLanguage } = useTranslate()
  const dispatch = useAppDispatch()

  return (
    <div className={css.headerContainer}>
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
    </div>
  )
}
