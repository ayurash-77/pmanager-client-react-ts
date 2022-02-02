import { FC } from 'react'
import { withLayout } from '../layout/Layout'
import Loader from '../components/ui/Loader'
import { ErrorList } from '../components/errors/ErrorList'
import { useGetAllProjectsQuery } from '../services/projectsApi'
import { toDateStr } from '../tools/date-time-format'

const ProjectsPage: FC = () => {
  const {
    data: projects = [],
    isLoading: isLoadingProjects,
    error: errorProjects,
  } = useGetAllProjectsQuery({})

  const loaderJsx = isLoadingProjects && <Loader size={32} />

  const errors = errorProjects && 'data' in errorProjects ? errorProjects.data.message : []
  const errorJsx = ErrorList(errors)

  const content = projects.map(item => (
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
