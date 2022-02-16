import { FC, useEffect, useState } from 'react'
import { withLayout } from '../layout/Layout'
import Loader from '../components/ui/Loader'
import { ErrorList } from '../components/errors/ErrorList'
import { useGetAllProjectsQuery } from '../store/api/projects.api'
import { toQuarterStr } from '../tools/date-time-format'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { setQuarterData, setSelectedId } from '../store/reducers/projects.reducer'
import ProjectCard from '../components/project-card/ProjectCard'
import styled from 'styled-components'

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

  const { quarterFilter, selectedId } = useAppSelector(state => state.projects)
  const errorJsx = ErrorList(errorProjects && 'data' in errorProjects ? errorProjects.data.message : [])

  const dispatch = useAppDispatch()

  const onProjectClickHandler = id => {
    dispatch(setSelectedId(selectedId === id ? null : id))
  }

  useEffect(() => {
    if (projects.length > 0) {
      dispatch(setQuarterData(projects))
    }
  }, [dispatch, projects])

  const projectsFilteredByQuarter = projects.filter(project => {
    return toQuarterStr(project.createdAt) === quarterFilter.quarter
  })

  const projectsFiltered = quarterFilter.isActive ? projectsFilteredByQuarter : projects

  const viewFilter = {
    brand: true,
    client: true,
    agency: true,
    created: true,
    startAt: true,
    deadline: true,
    status: true,
    owner: true,
    details: true,
  }

  const content = projectsFiltered.map(item => (
    <ProjectCard
      key={item.id}
      selected={selectedId === item.id}
      item={item}
      viewFilter={viewFilter}
      onClick={() => onProjectClickHandler(item.id)}
    />
  ))
  return (
    <ContainerGrid>
      {isLoadingProjects && <Loader size={64} border={8} />}
      {content}
      {errorJsx}
    </ContainerGrid>
  )
}

export default withLayout(ProjectsPage)
