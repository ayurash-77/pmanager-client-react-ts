import { FC, useEffect } from 'react'
import css from 'components/layout/Layout.module.scss'
import * as CommonIcons from '../../assets/icons/common-icons'
import * as ToolbarIcons from '../../assets/icons/toolbar-icons'
import { ErrorList } from '../../components/errors/ErrorList'
import { Filterbar } from '../../components/layout/filterbar/Filterbar'
import { HeaderMain } from '../../components/layout/header/HeaderMain'
import { Sidebar } from '../../components/layout/sidebar/Sidebar'
import Statusbar from '../../components/layout/statusbar/Statusbar'
import { Loader } from '../../components/ui'
import { ContextMenu } from '../../components/ui/ContextMenu/ContextMenu'
import { ContextMenuItem, IContextMenuItem } from '../../components/ui/ContextMenu/ContextMenuItem'
import { ProjectsGrid } from '../../entities/projects/projects-grid/ProjectsGrid'
import { ProjectsList } from '../../entities/projects/projects-list/ProjectsList'
import { useGetProjectsQuery } from '../../entities/projects/projects.api'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { useOnProjectClick } from '../../hooks/useOnProjectClick'
import { setQuarterData } from '../../store/reducers/projects.reducer'
import { toQuarterStr } from '../../utils/date-time-format'

////////////////////////////////////////////////////////////////////////
// ProjectsPage
////////////////////////////////////////////////////////////////////////

export const ProjectsPage: FC = () => {
  const { quarterFilter } = useAppSelector(state => state.projects)
  const { searchProjectsFilter } = useAppSelector(state => state.ui)
  const { activeProjectId } = useAppSelector(state => state.entities)

  const dispatch = useAppDispatch()

  const { data: projects = [], isLoading: isLoadingProjects, error: errorProjects } = useGetProjectsQuery()

  const { filterBar, projectsViewMode } = useAppSelector(state => state.ui)
  const searchProjects = searchProjectsFilter
    ? projects?.filter(item => item.title.includes(searchProjectsFilter))
    : projects

  const projectsFilteredByQuarter = searchProjects.filter(project => {
    return toQuarterStr(project.createdAt) === quarterFilter.quarter
  })

  const projectsFiltered = quarterFilter.isActive ? projectsFilteredByQuarter : searchProjects
  const activeProject = projectsFiltered?.find(project => project.id === activeProjectId)

  const { onProjectClickHandler, position, isMenuShow } = useOnProjectClick()

  const projectsContextMenuData: IContextMenuItem[] = [
    {
      title: 'New Project',
      icon: <CommonIcons.Plus />,
      shortcut: 'Ctrl+N',
      action: () => alert('New Project'),
    },
    {
      title: 'Edit Project',
      icon: <ToolbarIcons.Gear />,
      shortcut: 'Ctrl+E',
      action: () => alert('Edit Project'),
    },
    {
      title: 'Delete Project',
      icon: <CommonIcons.Trash />,
      variant: 'accent',
      shortcut: 'Ctrl+Del',
      action: () => alert('Delete Project'),
    },
  ]

  useEffect(() => {
    if (projects.length > 0) {
      dispatch(setQuarterData(projects))
    }
  }, [activeProjectId, dispatch, projects])

  ////////////////////////////////////////////////////////////////////////

  return (
    <>
      <div className={css.mainbar}>
        <HeaderMain />
        <Filterbar {...filterBar} />

        <div className={css.body}>
          {isLoadingProjects && <Loader size={64} border={8} />}
          <ErrorList error={errorProjects} />

          <ContextMenu show={isMenuShow} position={position}>
            {projectsContextMenuData.map(item => (
              <ContextMenuItem
                key={item.title}
                title={item.title}
                icon={item.icon}
                entityType={item.entityType}
                variant={item.variant}
                shortcut={item.shortcut}
                action={item.action}
              />
            ))}
          </ContextMenu>

          {projectsViewMode === 'grid' && (
            <ProjectsGrid projects={projectsFiltered} onClickHandler={onProjectClickHandler} />
          )}
          {projectsViewMode === 'list' && (
            <ProjectsList projects={projectsFiltered} onClickHandler={onProjectClickHandler} />
          )}
        </div>

        <Statusbar project={activeProject} />
      </div>
      <Sidebar project={activeProject} />
    </>
  )
}
