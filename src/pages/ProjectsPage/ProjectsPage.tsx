import { FC, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ErrorList } from '../../components/errors/ErrorList'
import { ProjectsGrid } from '../../components/features/projects/projects-grid/ProjectsGrid'
import { ProjectsList } from '../../components/features/projects/projects-list/ProjectsList'
import { BodyContainer } from '../../components/layout/BodyContainer'
import HeaderProjects from '../../components/layout/HeaderProjects'
import { MainbarContainer } from '../../components/layout/MainbarContainer'
import { Filterbar } from '../../components/layout/filterbar/Filterbar'
import { Sidebar } from '../../components/layout/sidebar/Sidebar'
import Statusbar from '../../components/layout/statusbar/Statusbar'
import { Loader } from '../../components/ui'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { IProject } from '../../interfaces/IProject'
import { useGetProjectsQuery } from '../../store/api/projects.api'
import { setActiveProjectId } from '../../store/reducers/entities.reducer'
import { setQuarterData } from '../../store/reducers/projects.reducer'
import { setActiveMenu } from '../../store/reducers/ui.reducer'
import { toQuarterStr } from '../../utils/date-time-format'

////////////////////////////////////////////////////////////////////////
// ProjectsPage
////////////////////////////////////////////////////////////////////////

export const ProjectsPage: FC = () => {
  const { quarterFilter } = useAppSelector(state => state.projects)
  const { searchProjectsFilter } = useAppSelector(state => state.ui)
  const { activeProjectId } = useAppSelector(state => state.entities)

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const { data: projects = [], isLoading: isLoadingProjects, error: errorProjects } = useGetProjectsQuery()

  const onProjectClickHandler = (project: IProject) => {
    dispatch(setActiveProjectId(activeProjectId === project.id ? null : project.id))
  }
  const onProjectDoubleClickHandler = (project: IProject) => {
    dispatch(setActiveProjectId(project.id))
    dispatch(setActiveMenu('reels'))
    navigate(`/projects/${project.id}/reels`, { state: 1 })
  }

  // const onClickHandler = useSingleAndDoubleClick(onProjectClickHandler, onProjectDoubleClickHandler)

  const onClickHandler = (e, project: IProject) => {
    switch (e.detail) {
      case 2:
        return onProjectDoubleClickHandler(project)
      case 1:
        return onProjectClickHandler(project)
    }
  }

  const { filterBar, projectsViewMode } = useAppSelector(state => state.ui)
  const searchProjects = searchProjectsFilter
    ? projects?.filter(item => item.title.includes(searchProjectsFilter))
    : projects

  const projectsFilteredByQuarter = searchProjects.filter(project => {
    return toQuarterStr(project.createdAt) === quarterFilter.quarter
  })

  const projectsFiltered = quarterFilter.isActive ? projectsFilteredByQuarter : searchProjects
  const activeProject = projectsFiltered?.find(project => project.id === activeProjectId)

  useEffect(() => {
    if (projects.length > 0) {
      dispatch(setQuarterData(projects))
    }
  }, [activeProjectId, dispatch, projects])

  ////////////////////////////////////////////////////////////////////////

  return (
    <>
      <MainbarContainer>
        <HeaderProjects />
        <Filterbar {...filterBar} />

        <BodyContainer>
          <>
            {isLoadingProjects && <Loader size={64} border={8} />}
            <ErrorList error={errorProjects} />
            {projectsViewMode === 'grid' && (
              <ProjectsGrid projects={projectsFiltered} onProjectClickHandler={onClickHandler} />
            )}
            {projectsViewMode === 'list' && (
              <ProjectsList projects={projectsFiltered} onProjectClickHandler={onClickHandler} />
            )}
          </>
        </BodyContainer>

        <Statusbar project={activeProject} />
      </MainbarContainer>
      <Sidebar project={activeProject} />
    </>
  )
}
