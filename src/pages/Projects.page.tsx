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
import { useGetProjects, useGetProject } from '../hooks/useProjectsData'

export const ProjectsPage: FC = () => {
  const { quarterFilter } = useAppSelector(state => state.projects)
  const { searchProjectsFilter } = useAppSelector(state => state.ui)
  const { activeProjectId } = useAppSelector(state => state.entities)

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const { data: projects = [], isLoading: isLoadingProjects, error: errorProjects } = useGetProjects()
  const { data: activeProject, isLoading: isLoadingProject } = useGetProject(activeProjectId)
  const errorJsx = errorProjects?.message

  const onProjectClickHandler = (project: IProject) => {
    dispatch(setActiveProjectId(activeProjectId === project.id ? null : project.id))
  }
  const onProjectDoubleClickHandler = (project: IProject) => {
    dispatch(setActiveProjectId(project.id))
    dispatch(setActiveMenu('reels'))
    navigate(`/project/${project.id}/reels`, { state: 1 })
  }

  const { filterBar, projectsViewMode } = useAppSelector(state => state.ui)
  const searchProjects = searchProjectsFilter
    ? projects?.filter(item => item.title.includes(searchProjectsFilter))
    : projects

  useEffect(() => {
    if (projects.length > 0) {
      dispatch(setQuarterData(projects))
    }
  }, [activeProjectId, dispatch, projects])

  const projectsFilteredByQuarter = searchProjects.filter(project => {
    return toQuarterStr(project.createdAt) === quarterFilter.quarter
  })

  const projectsFiltered = quarterFilter.isActive ? projectsFilteredByQuarter : searchProjects

  ////////////////////////////////////////////////////////////////////////

  return (
    <>
      <MainbarContainer>
        <HeaderProjects />
        <Filterbar {...filterBar} />

        <BodyContainer>
          {isLoadingProjects && <Loader size={64} border={8} />}
          {errorJsx}
          {projectsViewMode === 'grid' && (
            <ProjectsGrid
              projects={projectsFiltered}
              onProjectClickHandler={onProjectClickHandler}
              onProjectDoubleClickHandler={onProjectDoubleClickHandler}
            />
          )}
          {projectsViewMode === 'list' && (
            <ProjectsList
              projects={projectsFiltered}
              onProjectClickHandler={onProjectClickHandler}
              onProjectDoubleClickHandler={onProjectDoubleClickHandler}
            />
          )}
        </BodyContainer>

        <Statusbar />
      </MainbarContainer>
      <Sidebar />
    </>
  )
}
