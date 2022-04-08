import { DetailedHTMLProps, FC, HTMLAttributes, useState } from 'react'
import { useTranslate } from '../hooks/useTranslate'
import * as ToolbarIcons from '../assets/icons/toolbar-icons'
import * as CommonIcons from '../assets/icons/common-icons'
import { useGetAllProjectsQuery } from '../store/api/projects.api'
import Loader from '../components/ui/Loader'
import styled from 'styled-components'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { IQuarterItem } from '../tools/quarter-filter'
import NewProjectModal from '../modal/NewProjectModal'
import DeleteProjectModal from '../modal/DeleteProjectModal'
import {
  setFilterbarShow,
  setProjectsViewMode,
  setSidebarShow,
  setThemeMode,
} from '../store/reducers/ui.reducer'
import { IconButton, ToolButton, ToolButtonGroup, FlexRow, Input } from '../components/ui'
import { setSearchFilter } from '../store/reducers/projects.reducer'
import { IProject } from '../interfaces/IProject'

interface IHeader extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  activeProject: IProject
}

const Container = styled.div`
  padding: 8px 10px;
  z-index: 3;
  box-shadow: 0 0 4px var(--button-shadow);

  width: 100%;
  display: flex;
  justify-content: space-between;
  background-color: var(--header-bg);
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

export const HeaderProjects: FC<IHeader> = ({ activeProject }) => {
  const { darkMode } = useAppSelector(state => state.ui.theme)
  const { show: sidebarShow } = useAppSelector(state => state.ui.sidebar)

  const { language, setLanguage } = useTranslate()
  const { text } = useTranslate()

  const { data: projects = [], isLoading: isLoadingProjects } = useGetAllProjectsQuery({})
  const { quarterFilter, quarterData, activeProjectId } = useAppSelector(state => state.projects)
  const { filterBar, projectsViewMode } = useAppSelector(state => state.ui)
  const { authUser } = useAppSelector(state => state.auth)

  const canDeleteProjectRoles = ['Producer', 'Art director', 'Manager']

  const canDeleteProject = authUser.isAdmin || canDeleteProjectRoles.includes(authUser.role.name)

  const dispatch = useAppDispatch()

  const item: IQuarterItem = quarterData.find(project => project.quarter === quarterFilter.quarter)
  const projectsCount = quarterFilter.isActive ? item.count : projects.length

  const [isNewProjectModalShow, setNewProjectModalShow] = useState(false)
  const [isDeleteProjectModalShow, setDeleteProjectModalShow] = useState(false)

  const onSearchHandler = (value: string) => {
    dispatch(setSearchFilter(value))
  }

  const deleteProjectHandler = () => {
    setDeleteProjectModalShow(true)
  }

  return (
    <Container>
      <NewProjectModal isOpen={isNewProjectModalShow} closeAction={() => setNewProjectModalShow(false)} />
      <DeleteProjectModal
        isOpen={isDeleteProjectModalShow}
        closeAction={() => setDeleteProjectModalShow(false)}
        project={activeProject}
      />
      <TitleContainer>
        {text.project.projects}: {isLoadingProjects ? <Loader size={16} /> : projectsCount}
        <IconButton icon={<CommonIcons.Plus />} ml={10} mr={5} onClick={() => setNewProjectModalShow(true)} />
        {canDeleteProject && (
          <IconButton
            icon={<CommonIcons.Minus />}
            disabled={!activeProjectId}
            variant={'accent'}
            onClick={activeProjectId ? deleteProjectHandler : null}
          />
        )}
      </TitleContainer>

      <FlexRow align={'right'}>
        <Input
          width={'120px'}
          onChange={e => onSearchHandler(e.target.value)}
          autoFocus={true}
          placeholder={text.app.liveSearch}
        />
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
          <ToolButton
            icon={<ToolbarIcons.Info />}
            selected={sidebarShow}
            onClick={() => dispatch(setSidebarShow(!sidebarShow))}
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

export default HeaderProjects
