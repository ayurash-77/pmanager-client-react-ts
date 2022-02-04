import { FC, useEffect } from 'react'
import { withLayout } from '../layout/Layout'
import Loader from '../components/ui/Loader'
import { ErrorList } from '../components/errors/ErrorList'
import { useGetAllProjectsQuery } from '../store/api/projects.api'
import { toDateStr, toQuarterStr } from '../tools/date-time-format'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { setQuarterData } from '../store/reducers/projects.reducer'

const ProjectsPage: FC = () => {
  const {
    data: projects = [],
    isLoading: isLoadingProjects,
    error: errorProjects,
  } = useGetAllProjectsQuery({}, { pollingInterval: 60000 })

  const { quarterFilter, quarterFilterActive } = useAppSelector(state => state.projects)

  const loaderJsx = isLoadingProjects && <Loader size={32} />
  const errors = errorProjects && 'data' in errorProjects ? errorProjects.data.message : []
  const errorJsx = ErrorList(errors)

  const dispatch = useAppDispatch()

  useEffect(() => {
    if (projects.length > 0) {
      dispatch(setQuarterData(projects))
    }
  }, [dispatch, projects])

  const projectsFilteredByQuarter = projects.filter(project => {
    return toQuarterStr(project.createdAt) === quarterFilter
  })

  const projectsFiltered = quarterFilterActive ? projectsFilteredByQuarter : projects

  const content = projectsFiltered.map(item => (
    <div key={item.id}>
      <h3>
        {item.title} id: {item.id}
      </h3>
      <h4>owner: {item.owner.username}</h4>
      <div>createdAt: {toDateStr(item.createdAt)}</div>
      <div>updatedAt: {toDateStr(item.updatedAt)}</div>
      <div>startAt: {toDateStr(item.startAt)}</div>
    </div>
  ))
  return (
    <>
      {loaderJsx}
      {content}
      {errorJsx}
    </>
  )
}

export default withLayout(ProjectsPage)
