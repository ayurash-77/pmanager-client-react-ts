import { DetailedHTMLProps, FC, HTMLAttributes, useEffect, useState } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { useTranslate } from '../hooks/useTranslate'
import { ToolButton } from '../components/ui/ToolButton'
import * as ToolbarIcons from '../assets/icons/toolbar-icons'
import { Button16 } from '../components/ui/Button16'
import { useDeleteProjectMutation, useGetAllProjectsQuery } from '../store/api/projects.api'
import Loader from '../components/ui/Loader'
import styled from 'styled-components'
import { ToolbarContainer } from '../components/ui/Containers'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { IQuarterItem } from '../tools/quarter-filter'
import NewProjectModal from '../modal/NewProjectModal'
import DeleteProjectModal from '../modal/DeleteProjectModal'
import { setThemeMode } from '../store/reducers/ui.reducer'
import { appColors } from '../app/App.colors'

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
  background-color: ${appColors.header.BG};
  z-index: 2;
  box-shadow: 0 1px 8px ${appColors.buttons.SHADOW};
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
  const { darkMode } = useAppSelector(state => state.ui.theme)
  const { language, setLanguage } = useTranslate()
  const { text } = useTranslate()

  const { data: projects = [], isLoading: isLoadingProjects } = useGetAllProjectsQuery({})
  const { quarterFilter, quarterData, selectedId } = useAppSelector(state => state.projects)

  const selectedProject = selectedId ? projects.find(project => project.id === selectedId) : null

  const dispatch = useAppDispatch()

  const item: IQuarterItem = quarterData.find(project => project.quarter === quarterFilter.quarter)
  const projectsCount = quarterFilter.isActive ? item.count : projects.length

  const [isNewProjectModalShow, setNewProjectModalShow] = useState(false)
  const [isDeleteProjectModalShow, setDeleteProjectModalShow] = useState(false)

  const deleteProjectHandler = () => {
    setDeleteProjectModalShow(true)
  }

  return (
    <Container>
      <NewProjectModal isOpen={isNewProjectModalShow} closeAction={() => setNewProjectModalShow(false)} />
      <DeleteProjectModal
        isOpen={isDeleteProjectModalShow}
        closeAction={() => setDeleteProjectModalShow(false)}
        project={selectedProject}
      />
      <TitleContainer>
        {text.project.projects}: {isLoadingProjects ? <Loader size={16} /> : projectsCount}
        <Button16 icon={<ToolbarIcons.Plus />} marginLeft={10} onClick={() => setNewProjectModalShow(true)} />
        <Button16
          icon={<ToolbarIcons.Minus />}
          disabled={!selectedId}
          marginLeft={5}
          accent={true}
          onClick={selectedId ? deleteProjectHandler : null}
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
          selected={darkMode}
          onClick={() => dispatch(setThemeMode(true))}
        />
        <ToolButton
          icon={<ToolbarIcons.Sun />}
          rounded="right"
          selected={!darkMode}
          onClick={() => dispatch(setThemeMode(false))}
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
