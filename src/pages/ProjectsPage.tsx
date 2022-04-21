import { FC, useEffect } from 'react'
import Loader from '../components/ui/Loader'
import { ErrorList } from '../components/errors/ErrorList'
import { useGetAllProjectsQuery, useGetProjectByIdQuery } from '../store/api/projects.api'
import { toDateStr, toQuarterStr } from '../tools/date-time-format'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { setQuarterData } from '../store/reducers/projects.reducer'
import { setActiveProjectId } from '../store/reducers/entities.reducer'
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
import { Sidebar } from '../layout/sidebar/Sidebar'
import HeaderProjects from '../layout/HeaderProjects'
import Statusbar from '../layout/statusbar/Statusbar'
import { BodyContainer } from '../layout/BodyContainer'
import { setActiveMenu } from '../store/reducers/ui.reducer'

const ContainerGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  grid-gap: 5px;
  grid-template-columns: repeat(auto-fill, 160px);
  justify-content: space-evenly;
`

export const ProjectsPage: FC = () => {
  const { quarterFilter } = useAppSelector(state => state.projects)
  const { searchProjectsFilter } = useAppSelector(state => state.ui)
  const { activeProjectId } = useAppSelector(state => state.entities)

  const { data: projects = [], isLoading: isLoadingProjects, error: errorProjects } = useGetAllProjectsQuery()

  const { data: activeProject, isFetching: isFetchingProject } = useGetProjectByIdQuery(activeProjectId)
  const errorJsx = ErrorList(errorProjects && 'data' in errorProjects ? errorProjects.data.message : [])

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

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
  const viewFilter = filterBar.filters[projectsViewMode]

  const ProjectGridContent = (
    <ContainerGrid>
      {projectsFiltered.map(item => (
        <ProjectCard
          key={item.id}
          isSelected={item.id === activeProjectId}
          project={item}
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
          {viewFilter.client && <th>{text.project.client}</th>}
          {viewFilter.brand && <th>{text.project.brand}</th>}
          {viewFilter.agency && <th>{text.project.agency}</th>}
          {viewFilter.createdAt && <th>{text.common.createdAt}</th>}
          {viewFilter.startAt && <th>{text.common.startAt}</th>}
          {viewFilter.deadline && <th>{text.common.deadline}</th>}
          {viewFilter.owner && <th>{text.common.owner}</th>}
          {viewFilter.progress && <th>{text.common.progress}</th>}
          {viewFilter.details && <th>{text.common.details}</th>}
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
            {viewFilter.client && <td style={{ opacity: 0.75 }}>{item.client?.name}</td>}
            {viewFilter.brand && <td style={{ opacity: 0.75 }}>{item.brand?.name}</td>}
            {viewFilter.agency && <td style={{ opacity: 0.75 }}>{item.agency?.name}</td>}
            {viewFilter.createdAt && (
              <td className="owner">{item.createdAt ? toDateStr(item.createdAt) : ' --- '}</td>
            )}
            {viewFilter.startAt && (
              <td className="date">{item.startAt ? toDateStr(item.startAt) : ' --- '}</td>
            )}
            {viewFilter.deadline && (
              <td className="deadline">{item.deadline ? toDateStr(item.deadline) : ' --- '}</td>
            )}
            {viewFilter.owner && <td className="owner">{item.owner.username}</td>}
            {viewFilter.progress && (
              <td>
                <InfoProgress progress={item.progress} status={item.status} withValue={false} />
              </td>
            )}
            {viewFilter.details && <td style={{ opacity: 0.75 }}>{item.details}</td>}
          </tr>
        ))}
      </tbody>
    </Table>
  )

  ////////////////////////////////////////////////////////////////////////

  return (
    <>
      <MainbarContainer>
        <HeaderProjects />
        <Filterbar {...filterBar} />

        <BodyContainer>
          {isLoadingProjects && <Loader size={64} border={8} />}
          {errorJsx}
          {projectsViewMode === 'grid' && ProjectGridContent}
          {projectsViewMode === 'list' && ProjectsListContent}
        </BodyContainer>

        <Statusbar project={activeProject} isFetchingProject={isFetchingProject} />
      </MainbarContainer>
      <Sidebar project={activeProject} isFetchingProject={isFetchingProject} />
    </>
  )
}
