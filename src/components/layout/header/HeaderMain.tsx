import { skipToken } from '@reduxjs/toolkit/query'
import { FC, useState } from 'react'
import * as CommonIcons from '../../../assets/icons/common-icons'
import * as ToolbarIcons from '../../../assets/icons/toolbar-icons'
import DeleteProjectModal from '../../../entities/projects/DeleteProjectModal'
import NewProjectModal from '../../../entities/projects/NewProjectModal'
import { useGetProjectQuery, useGetProjectsQuery } from '../../../entities/projects/projects.api'
import { useAppDispatch, useAppSelector } from '../../../hooks/redux'
import { useTranslate } from '../../../hooks/useTranslate'
import {
  setFilterbarShow,
  setProjectsViewMode,
  setSearchProjectsFilter,
  setSidebarShow,
  setThemeMode,
} from '../../../store/reducers/ui.reducer'
import { IQuarterItem } from '../../../utils/quarter-filter'
import { FlexRow, IconButton, Input, Loader, ToolButton, ToolButtonGroup } from '../../ui'
import css from './HeaderMain.module.scss'

// HeaderMain

export const HeaderMain: FC = () => {
  const { darkMode } = useAppSelector(state => state.ui.theme)
  const { show: sidebarShow } = useAppSelector(state => state.ui.sidebar)

  const { language, setLanguage } = useTranslate()
  const { text } = useTranslate()

  const { data: projects = [], isLoading: isLoadingProjects } = useGetProjectsQuery()
  const { quarterFilter, quarterData } = useAppSelector(state => state.projects)
  const { activeProjectId } = useAppSelector(state => state.entities)
  const { filterBar, projectsViewMode } = useAppSelector(state => state.ui)
  const { authUser } = useAppSelector(state => state.auth)

  const { data: activeProject } = useGetProjectQuery(activeProjectId ?? skipToken)

  const canDeleteProjectRoles = ['Producer', 'Art director', 'Manager']

  const canDeleteProject = authUser.isAdmin || canDeleteProjectRoles.includes(authUser.role.name)

  const dispatch = useAppDispatch()

  const item: IQuarterItem = quarterData.find(project => project.quarter === quarterFilter.quarter)
  const projectsCount = quarterFilter.isActive ? item.count : projects.length

  const [isNewProjectModalShow, setNewProjectModalShow] = useState(false)
  const [isDeleteProjectModalShow, setDeleteProjectModalShow] = useState(false)

  const onSearchHandler = (value: string) => {
    dispatch(setSearchProjectsFilter(value))
  }

  const deleteProjectHandler = () => {
    setDeleteProjectModalShow(true)
  }

  const newProjectModalShowHandler = () => {
    setNewProjectModalShow(true)
  }

  return (
    <div className={css.container}>
      <NewProjectModal isOpen={isNewProjectModalShow} closeAction={() => setNewProjectModalShow(false)} />
      <DeleteProjectModal
        isOpen={isDeleteProjectModalShow}
        closeAction={() => setDeleteProjectModalShow(false)}
        project={activeProject}
      />
      <div className={css.title}>
        {text.project.projects}: {isLoadingProjects ? <Loader size={16} /> : projectsCount}
        <IconButton icon={<CommonIcons.Plus />} ml={10} mr={5} onClick={newProjectModalShowHandler} />
        {canDeleteProject && (
          <IconButton
            icon={<CommonIcons.Trash />}
            disabled={!activeProjectId}
            variant={'accent'}
            size={14}
            onClick={activeProjectId ? deleteProjectHandler : null}
          />
        )}
      </div>

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
    </div>
  )
}