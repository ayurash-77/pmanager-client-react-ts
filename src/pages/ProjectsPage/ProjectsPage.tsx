import { FC, useEffect } from 'react'
import css from 'components/layout/Layout.module.scss'
import { CommonIcons } from '../../assets/icons/common-icons'
import * as ToolbarIcons from '../../assets/icons/toolbar-icons'
import { ErrorList } from '../../components/errors/ErrorList'
import { Filterbar } from '../../components/layout/filterbar/Filterbar'
import { HeaderMain } from '../../components/layout/header/HeaderMain'
import { Sidebar } from '../../components/layout/sidebar/Sidebar'
import Statusbar from '../../components/layout/statusbar/Statusbar'
import { Loader } from '../../components/ui'
import { ContextMenu } from '../../components/ui/ContextMenu/ContextMenu'
import { IContextMenuItem } from '../../components/ui/ContextMenu/ContextMenuItem'
import DeleteProjectModal from '../../entities/projects/DeleteProjectModal'
import ProjectModal from '../../entities/projects/ProjectModal'
import { ProjectsGrid } from '../../entities/projects/projects-grid/ProjectsGrid'
import { ProjectsList } from '../../entities/projects/projects-list/ProjectsList'
import { useGetProjectsQuery } from '../../entities/projects/projects.api'
import { useOnProjectClick } from '../../entities/projects/useOnProjectClick'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { useContextMenu } from '../../hooks/useContextMenu'
import { usePermissions } from '../../hooks/usePermissions'
import { setDeleteProjectModalShow, setProjectModal } from '../../store/reducers/modals.reducer'
import { setQuarterData } from '../../store/reducers/projects.reducer'
import { toQuarterStr } from '../../utils/date-time-format'

////////////////////////////////////////////////////////////////////////
// ProjectsPage
////////////////////////////////////////////////////////////////////////

export const ProjectsPage: FC = () => {
  const { quarterFilter } = useAppSelector(state => state.projects)
  const { searchProjectsFilter } = useAppSelector(state => state.ui)
  const { activeProjectId } = useAppSelector(state => state.entities)
  const { newProjectModalShow, deleteProjectModalShow } = useAppSelector(state => state.modals)

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

  const { canCreateProject, canEditProject, canDeleteProject } = usePermissions()
  const { position, isMenuShow, showContextMenu } = useContextMenu()
  const { onProjectClickHandler, isProjectMenuShow } = useOnProjectClick()

  const homeContextMenuData: IContextMenuItem[] = [
    {
      title: 'New Project',
      icon: CommonIcons.plus(),
      shortcut: 'Ctrl+N',
      action: () => canCreateProject && dispatch(setProjectModal({ isOpen: true })),
      disabled: !canCreateProject,
    },
  ]

  const projectContextMenuData: IContextMenuItem[] = [
    {
      title: 'New Project',
      icon: CommonIcons.plus(),
      shortcut: 'Ctrl+N',
      action: () => canCreateProject && dispatch(setProjectModal({ isOpen: true })),
      disabled: !canCreateProject,
    },
    {
      title: 'Edit Project',
      icon: <ToolbarIcons.Gear />,
      shortcut: 'Ctrl+E',
      action: () => canEditProject && alert('Edit Project'),
      disabled: !canEditProject,
    },
    {
      title: 'Delete Project',
      icon: CommonIcons.trash(),
      variant: 'accent',
      shortcut: 'Ctrl+Del',
      action: () => canDeleteProject && dispatch(setDeleteProjectModalShow(true)),
      disabled: !canDeleteProject,
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
      <ProjectModal />
      <DeleteProjectModal
        isOpen={deleteProjectModalShow}
        closeAction={() => dispatch(setDeleteProjectModalShow(false))}
        project={activeProject}
      />
      <div className={css.mainbar}>
        <HeaderMain />
        <Filterbar {...filterBar} />

        <ContextMenu show={isMenuShow} position={position} data={homeContextMenuData} />

        <ContextMenu show={isProjectMenuShow} position={position} data={projectContextMenuData} />

        <div className={css.body} onContextMenu={showContextMenu}>
          {isLoadingProjects && <Loader size={64} border={8} />}
          <ErrorList error={errorProjects} />

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
