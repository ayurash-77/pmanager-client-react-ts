import { DetailedHTMLProps, FC, HTMLAttributes, useEffect } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { useTranslate } from '../hooks/useTranslate'
import { ToolButton } from '../components/ui/ToolButton'
import * as ToolbarIcons from '../assets/icons/toolbar-icons'
import { Button16 } from '../components/ui/Button16'
import { useGetAllProjectsQuery } from '../store/api/projects.api'
import Loader from '../components/ui/Loader'
import styled from 'styled-components'
import { ToolbarContainer } from '../components/ui/Containers'
import { useAppSelector } from '../hooks/redux'
import { IQuarterFilter } from '../tools/quarter-filter'

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  sidebarShow: boolean
}

interface IHeader extends Props {
  onClick: () => void
}

const Container = styled.div`
  padding: 8px 10px;
  display: flex;
  justify-content: space-between;
  background-color: var(--bg-header);
  z-index: 2;
  box-shadow: 0 1px 8px var(--btn-shadow);
`
const TitleContainer = styled.div`
  font-size: var(--font-size-normal);
  text-transform: capitalize;
  white-space: nowrap;
  font-weight: 500;
  display: flex;
  align-items: center;
  text-wrap: none;
`

export const Header: FC<IHeader> = props => {
  const [theme, setTheme] = useLocalStorage('dark', 'theme')
  const { language, setLanguage } = useTranslate()
  const { text } = useTranslate()

  const { data: projects = [], isLoading: isLoadingProjects } = useGetAllProjectsQuery({})
  const { quarterFilter, quarterData, quarterFilterActive } = useAppSelector(state => state.projects)

  const item: IQuarterFilter = quarterData.find(project => project.quarter === quarterFilter)
  const projectsCount = quarterFilterActive ? item.count : projects.length

  useEffect(() => {
    document.body.setAttribute('data-theme', theme)
  }, [theme])

  return (
    <Container>
      <TitleContainer>
        {text.project.projects}: {isLoadingProjects ? <Loader size={16} /> : projectsCount}
        <Button16
          icon={<ToolbarIcons.Plus />}
          marginLeft={10}
          onClick={() => {
            console.log('ToolbarIcons.Plus PRESSED')
          }}
        />
      </TitleContainer>

      <ToolbarContainer align={'right'}>
        <ToolButton
          icon={<ToolbarIcons.Info />}
          rounded="all"
          selected={props.sidebarShow}
          onClick={props.onClick}
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
      </ToolbarContainer>
    </Container>
  )
}

export default Header
