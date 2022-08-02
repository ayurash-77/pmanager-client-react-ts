import { FC, useEffect } from 'react'
import css from 'components/layout/Layout.module.scss'
import { ErrorList } from '../../components/errors/ErrorList'
import { Filterbar } from '../../components/layout/filterbar/Filterbar'
import { HeaderMain } from '../../components/layout/header/HeaderMain'
import { Sidebar } from '../../components/layout/sidebar/Sidebar'
import Statusbar from '../../components/layout/statusbar/Statusbar'
import { Loader } from '../../components/ui'
import { ContextMenu } from '../../components/ui/ContextMenu/ContextMenu'
import DeleteProjectModal from '../../entities/projects/DeleteProjectModal'
import ProjectModal from '../../entities/projects/ProjectModal'
import { ProjectsGrid } from '../../entities/projects/projects-grid/ProjectsGrid'
import { ProjectsList } from '../../entities/projects/projects-list/ProjectsList'
import { useGetProjectsQuery } from '../../entities/projects/projects.api'
import { useOnProjectClick } from '../../entities/projects/useOnProjectClick'
import { useOnProjectsSpaceClick } from '../../entities/projects/useOnProjectsSpaceClick'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
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

  const { showCommonMenu, isCommonMenuShow, commonMenuData, position } = useOnProjectsSpaceClick()
  const { showItemMenu, isItemMenuShow, itemMenuData } = useOnProjectClick()

  useEffect(() => {
    if (projects.length > 0) {
      dispatch(setQuarterData(projects))
    }
  }, [activeProjectId, dispatch, projects])

  ////////////////////////////////////////////////////////////////////////

  return (
    <>
      <ProjectModal />
      <DeleteProjectModal item={activeProject} />
      <div className={css.mainbar}>
        <HeaderMain />
        <Filterbar {...filterBar} />

        <ContextMenu show={isItemMenuShow} data={itemMenuData} position={position} />
        <ContextMenu show={!isItemMenuShow && isCommonMenuShow} data={commonMenuData} position={position} />

        <div className={css.body} onContextMenu={showCommonMenu}>
          {isLoadingProjects && <Loader size={64} border={8} />}
          <ErrorList error={errorProjects} />

          {projectsViewMode === 'grid' && (
            <ProjectsGrid projects={projectsFiltered} showItemMenu={showItemMenu} />
          )}
          {projectsViewMode === 'list' && (
            <ProjectsList projects={projectsFiltered} showItemMenu={showItemMenu} />
          )}
        </div>

        <Statusbar project={activeProject} />
      </div>
      <Sidebar project={activeProject} />
    </>
  )
}
