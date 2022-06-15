import { FC, useEffect } from 'react'
import Loader from '../components/ui/Loader'
import { toQuarterStr } from '../utils/date-time-format'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { setQuarterData } from '../store/reducers/projects.reducer'
import { setActiveProjectId } from '../store/reducers/entities.reducer'
import { useNavigate } from 'react-router-dom'
import { IProject } from '../interfaces/IProject'
import { MainbarContainer } from '../layout/MainbarContainer'
import { Filterbar } from '../layout/filterbar/Filterbar'
import { Sidebar } from '../layout/sidebar/Sidebar'
import HeaderProjects from '../layout/HeaderProjects'
import Statusbar from '../layout/statusbar/Statusbar'
import { BodyContainer } from '../layout/BodyContainer'
import { setActiveMenu } from '../store/reducers/ui.reducer'
import { ProjectsList } from '../components/projects-list/ProjectsList'
import { ProjectsGrid } from '../components/projects-grid/ProjectsGrid'
import { useGetProjectsQuery } from '../store/api/projects.api'
import { ErrorList } from '../components/errors/ErrorList'

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
    // console.log('CLICK')
  }
  const onProjectDoubleClickHandler = (project: IProject) => {
    dispatch(setActiveProjectId(project.id))
    dispatch(setActiveMenu('reels'))
    navigate(`/projects/${project.id}/reels`, { state: 1 })
    // console.log('DOUBLE CLICK')
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
