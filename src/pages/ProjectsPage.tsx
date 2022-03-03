import { FC, useEffect } from 'react'
import { withLayout } from '../layout/Layout'
import Loader from '../components/ui/Loader'
import { ErrorList } from '../components/errors/ErrorList'
import { useGetAllProjectsQuery } from '../store/api/projects.api'
import { toDateStr, toQuarterStr } from '../tools/date-time-format'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { setQuarterData, setSelectedId } from '../store/reducers/projects.reducer'
import ProjectCard from '../components/project-card/ProjectCard'
import styled from 'styled-components'
import { useTranslate } from '../hooks/useTranslate'
import { InfoProgress } from '../components/info-elements'
import { Table } from '../components/ui'
import cn from 'classnames'

const ContainerGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  grid-gap: 5px;
  grid-template-columns: repeat(auto-fill, 160px);
  justify-content: space-evenly;
`

const ProjectsPage: FC = () => {
  const {
    data: projects = [],
    isLoading: isLoadingProjects,
    error: errorProjects,
  } = useGetAllProjectsQuery({}, { refetchOnFocus: true, pollingInterval: 30000 })

  const { quarterFilter, selectedId, searchFilter } = useAppSelector(state => state.projects)
  const errorJsx = ErrorList(errorProjects && 'data' in errorProjects ? errorProjects.data.message : [])

  const dispatch = useAppDispatch()

  const onProjectClickHandler = (id: number) => {
    dispatch(setSelectedId(selectedId === id ? null : id))
  }

  const { darkMode } = useAppSelector(state => state.ui.theme)
  const { filterBar, projectsViewMode } = useAppSelector(state => state.ui)
  const searchProjects = searchFilter ? projects?.filter(item => item.title.includes(searchFilter)) : projects

  useEffect(() => {
    document.body.setAttribute('darkMode', darkMode.toString())
    if (projects.length > 0) {
      dispatch(setQuarterData(projects))
    }
  }, [darkMode, dispatch, projects])

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
          selected={selectedId === item.id}
          item={item}
          viewFilter={projectsViewFilter}
          onClick={() => onProjectClickHandler(item.id)}
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
          {projectsViewFilter.createdAt && <th>{text.project.createdAt}</th>}
          {projectsViewFilter.startAt && <th>{text.project.startAt}</th>}
          {projectsViewFilter.deadline && <th>{text.project.deadline}</th>}
          {projectsViewFilter.owner && <th>{text.project.owner}</th>}
          {projectsViewFilter.progress && <th>{text.project.progress}</th>}
          {projectsViewFilter.details && <th>{text.project.details}</th>}
        </tr>
      </thead>
      <tbody>
        {projectsFiltered.map((item, idx) => (
          <tr
            key={item.id}
            onClick={() => onProjectClickHandler(item.id)}
            className={cn({ selected: selectedId === item.id })}
          >
            <td style={{ opacity: 0.5 }}>{idx + 1}</td>
            <td className={'bold'}>{item.title}</td>
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
      {isLoadingProjects && <Loader size={64} border={8} />}
      {errorJsx}
      {projectsViewMode === 'grid' && ProjectGridContent}
      {projectsViewMode === 'list' && ProjectsListContent}
    </>
  )
}

export default withLayout(ProjectsPage)
// export default ProjectsPage
