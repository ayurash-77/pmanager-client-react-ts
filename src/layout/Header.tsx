import { DetailedHTMLProps, Dispatch, FC, HTMLAttributes, useEffect } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { useTranslate } from '../hooks/useTranslate'
import { ToolButton } from '../components/ui/ToolButton'
import { TitleContainer, ToolbarContainer } from '../components/ui/Containers'
import * as ToolbarIcons from '../assets/icons/toolbar-icons'
import { Button16 } from '../components/ui/Button16'
import { useGetAllProjectsQuery } from '../services/projectsApi'
import Loader from '../components/ui/Loader'

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  sidebarShow: boolean
}

interface IHeader extends Props {
  toggle: Dispatch<any>
}

export const Header: FC<IHeader> = ({ sidebarShow, toggle, ...props }: IHeader): JSX.Element => {
  const [theme, setTheme] = useLocalStorage('dark', 'theme')
  const { language, setLanguage } = useTranslate()
  const { text } = useTranslate()

  const { data: projects = [], isLoading: isLoadingProjects } = useGetAllProjectsQuery({})

  useEffect(() => {
    document.body.setAttribute('data-theme', theme)
  }, [theme])

  return (
    <div {...props}>
      <TitleContainer>
        {text.project.projects}: {isLoadingProjects ? <Loader size={16} /> : projects.length}
        <Button16
          icon={<ToolbarIcons.Plus />}
          marginLeft={10}
          action={() => {
            console.log('ToolbarIcons.Plus PRESSED')
          }}
        />
      </TitleContainer>

      <ToolbarContainer>
        <ToolButton icon={<ToolbarIcons.Info />} rounded="all" selected={sidebarShow} action={toggle} />
        <ToolButton
          icon={<ToolbarIcons.Moon />}
          rounded="left"
          selected={theme === 'dark'}
          action={() => setTheme('dark')}
        />
        <ToolButton
          icon={<ToolbarIcons.Sun />}
          rounded="right"
          selected={theme === 'light'}
          action={() => setTheme('light')}
        />
        <ToolButton
          icon={<ToolbarIcons.LangEn />}
          rounded="left"
          selected={language === 'en'}
          action={() => setLanguage('en')}
        />
        <ToolButton
          icon={<ToolbarIcons.LangRu />}
          rounded="right"
          selected={language === 'ru'}
          action={() => setLanguage('ru')}
        />
      </ToolbarContainer>
    </div>
  )
}

export default Header
