import { DetailedHTMLProps, FC, HTMLAttributes, useState } from 'react'
import { useTranslate } from '../hooks/useTranslate'
import * as ToolbarIcons from '../assets/icons/toolbar-icons'
import { useGetAllProjectsQuery } from '../store/api/projects.api'
import Loader from '../components/ui/Loader'
import styled from 'styled-components'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { IQuarterItem } from '../tools/quarter-filter'
import NewProjectModal from '../modal/NewProjectModal'
import DeleteProjectModal from '../modal/DeleteProjectModal'
import { setFilterbarShow, setProjectsViewMode, setThemeMode } from '../store/reducers/ui.reducer'
import { IconButton, ToolButton, ToolButtonGroup, FlexRow } from '../components/ui'
import { useGetAllRolesQuery } from '../store/api/roles.api'
import { IRole } from '../interfaces/IRole'

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
  background-color: var(--header-bg);
  z-index: 3;
  box-shadow: 0 0 4px var(--button-shadow);
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
  const { filterBar, projectsViewMode } = useAppSelector(state => state.ui)
  const { authUser } = useAppSelector(state => state.auth)

  const canDeleteProjectRoles = ['Producer', 'Art director', 'Manager']
  const canDeleteProject =
    authUser.isAdmin || authUser.roles.some(role => canDeleteProjectRoles.includes(role.name))

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
        <IconButton
          icon={<ToolbarIcons.Plus />}
          ml={10}
          mr={5}
          onClick={() => setNewProjectModalShow(true)}
        />
        {canDeleteProject && (
          <IconButton
            icon={<ToolbarIcons.Minus />}
            disabled={!selectedId}
            variant={'accent'}
            onClick={selectedId ? deleteProjectHandler : null}
          />
        )}
      </TitleContainer>

      <FlexRow align={'right'}>
        <ToolButtonGroup>
          <ToolButton
            icon={<ToolbarIcons.Grid />}
            selected={projectsViewMode === 'grid'}
            onClick={() => dispatch(setProjectsViewMode('grid'))}
          />
          <ToolButton
            icon={<ToolbarIcons.List />}
            selected={projectsViewMode === 'list'}
            onClick={() => dispatch(setProjectsViewMode('list'))}
          />
          <ToolButton
            icon={<ToolbarIcons.Eye />}
            selected={filterBar.show}
            onClick={() => dispatch(setFilterbarShow(!filterBar.show))}
          />
        </ToolButtonGroup>
        <ToolButtonGroup>
          <ToolButton icon={<ToolbarIcons.Info />} selected={props.sidebarShow} onClick={props.onClick} />
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
      </FlexRow>
    </Container>
  )
}

export default Header
