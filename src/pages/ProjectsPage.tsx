import { FC, useEffect } from 'react'
import Loader from '../components/ui/Loader'
import { ErrorList } from '../components/errors/ErrorList'
import { useGetAllProjectsQuery, useGetProjectByIdQuery } from '../store/api/projects.api'
import { toDateStr, toQuarterStr } from '../tools/date-time-format'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { setActiveProjectId, setQuarterData } from '../store/reducers/projects.reducer'
import ProjectCard from '../components/project-card/ProjectCard'
import styled from 'styled-components'
import { useTranslate } from '../hooks/useTranslate'
import { InfoProgress, InfoProjectTitle } from '../components/info-elements'
import { Table } from '../components/ui'
import cn from 'classnames'
import { useNavigate } from 'react-router-dom'
import { IProject } from '../interfaces/IProject'
import { MainbarContainer } from '../layout/MainbarContainer'
import { Filterbar } from '../layout/filterbar/Filterbar'
import { HeaderProject } from '../layout/HeaderProject'
import { Sidebar } from '../layout/sidebar/Sidebar'
import HeaderProjects from '../layout/HeaderProjects'
import Statusbar from '../layout/statusbar/Statusbar'
import { BodyContainer } from '../layout/BodyContainer'

const Body = styled.div`
  z-index: 1;
  padding: 10px;
  height: 100%;
  overflow: auto;
`

const ContainerGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  grid-gap: 5px;
  grid-template-columns: repeat(auto-fill, 160px);
  justify-content: space-evenly;
`

export const ProjectsPage: FC = () => {
  const { quarterFilter, activeProjectId, searchFilter } = useAppSelector(state => state.projects)

  const {
    data: projects = [],
    isLoading: isLoadingProjects,
    error: errorProjects,
  } = useGetAllProjectsQuery({}, { refetchOnFocus: true, pollingInterval: 30000 })

  const { data: activeProject } = useGetProjectByIdQuery(activeProjectId)
  const errorJsx = ErrorList(errorProjects && 'data' in errorProjects ? errorProjects.data.message : [])

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const onProjectClickHandler = (project: IProject) => {
    dispatch(setActiveProjectId(activeProjectId === project.id ? null : project.id))
  }
  const onProjectDoubleClickHandler = (project: IProject) => {
    dispatch(setActiveProjectId(project.id))
    navigate(`/project/${project.id}/overview`, { state: 1 })
  }

  const { filterBar, projectsViewMode } = useAppSelector(state => state.ui)
  const searchProjects = searchFilter ? projects?.filter(item => item.title.includes(searchFilter)) : projects

  useEffect(() => {
    if (projects.length > 0) {
      dispatch(setQuarterData(projects))
    }
  }, [activeProjectId, dispatch, projects])

  const projectsFilteredByQuarter = searchProjects.filter(project => {
    return toQuarterStr(project.createdAt) === quarterFilter.quarter
  })

  const projectsFiltered = quarterFilter.isActive ? projectsFilteredByQuarter : searchProjects
  const projectsViewFilter = filterBar.filters[projectsViewMode]

  const ProjectGridContent = (
    <ContainerGrid>
      {projectsFiltered.map(item => (
        <ProjectCard
          key={item.id}
          selected={item.id === activeProjectId}
          item={item}
          viewFilter={projectsViewFilter}
          onClick={() => onProjectClickHandler(item)}
          onDoubleClick={() => onProjectDoubleClickHandler(item)}
        />
      ))}
    </ContainerGrid>
  )

  const { text } = useTranslate()
  const ProjectsListContent = (
    <Table>
      <thead>
        <tr>
          <th>№</th>
          <th>{text.project.projectName}</th>
          {projectsViewFilter.client && <th>{text.project.client}</th>}
          {projectsViewFilter.brand && <th>{text.project.brand}</th>}
          {projectsViewFilter.agency && <th>{text.project.agency}</th>}
          {projectsViewFilter.createdAt && <th>{text.common.createdAt}</th>}
          {projectsViewFilter.startAt && <th>{text.common.startAt}</th>}
          {projectsViewFilter.deadline && <th>{text.common.deadline}</th>}
          {projectsViewFilter.owner && <th>{text.common.owner}</th>}
          {projectsViewFilter.progress && <th>{text.common.progress}</th>}
          {projectsViewFilter.details && <th>{text.common.details}</th>}
        </tr>
      </thead>
      <tbody>
        {projectsFiltered.map((item, idx) => (
          <tr
            key={item.id}
            onClick={() => onProjectClickHandler(item)}
            onDoubleClick={() => onProjectDoubleClickHandler(item)}
            className={cn({ selected: item.id === activeProjectId })}
          >
            <td style={{ opacity: 0.5 }}>{idx + 1}</td>
            <td className={'bold'}>
              <InfoProjectTitle
                align={'left'}
                title={item.title}
                highPriority={item.highPriority}
                status={item.status}
              />
            </td>
            {projectsViewFilter.client && <td style={{ opacity: 0.75 }}>{item.client?.name}</td>}
            {projectsViewFilter.brand && <td style={{ opacity: 0.75 }}>{item.brand?.name}</td>}
            {projectsViewFilter.agency && <td style={{ opacity: 0.75 }}>{item.agency?.name}</td>}
            {projectsViewFilter.createdAt && (
              <td className="owner">{item.createdAt ? toDateStr(item.createdAt) : ' --- '}</td>
            )}
            {projectsViewFilter.startAt && (
              <td className="date">{item.startAt ? toDateStr(item.startAt) : ' --- '}</td>
            )}
            {projectsViewFilter.deadline && (
              <td className="deadline">{item.deadline ? toDateStr(item.deadline) : ' --- '}</td>
            )}
            {projectsViewFilter.owner && <td className="owner">{item.owner.username}</td>}
            {projectsViewFilter.progress && (
              <td>
                <InfoProgress progress={item.progress} status={item.status} withValue={false} />
              </td>
            )}
            {projectsViewFilter.details && <td style={{ opacity: 0.75 }}>{item.details}</td>}
          </tr>
        ))}
      </tbody>
    </Table>
  )

  ////////////////////////////////////////////////////////////////////////

  return (
    <>
      <MainbarContainer>
        <HeaderProjects activeProject={activeProject} />
        <Filterbar {...filterBar} />

        <BodyContainer>
          {isLoadingProjects && <Loader size={64} border={8} />}
          {errorJsx}
          {projectsViewMode === 'grid' && ProjectGridContent}
          {projectsViewMode === 'list' && ProjectsListContent}
        </BodyContainer>

        <Statusbar project={activeProject} />
      </MainbarContainer>
      <Sidebar project={activeProject} />
    </>
  )
}
