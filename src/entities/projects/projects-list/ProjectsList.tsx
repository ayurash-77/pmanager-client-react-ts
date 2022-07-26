import cn from 'classnames'
import { FC } from 'react'
import { InfoProgress, InfoProjectTitle } from '../../../components/info-elements'
import { Table } from '../../../components/ui'
import { useAppSelector } from '../../../hooks/redux'
import { useTranslate } from '../../../hooks/useTranslate'
import { toDateStr } from '../../../utils/date-time-format'
import { IProject } from '../projects.interfaces'

interface IProjectsList {
  projects: IProject[]
  onProjectClickHandler: (e, item) => void
  // onProjectDoubleClickHandler: (e) => void
}

export const ProjectsList: FC<IProjectsList> = props => {
  const { projects = [], onProjectClickHandler } = props
  const { text } = useTranslate()
  const { activeProjectId } = useAppSelector(state => state.entities)
  const { filterBar, projectsViewMode } = useAppSelector(state => state.ui)
  const viewFilter = filterBar.filters[projectsViewMode]

  const ProjectsListContent = projects && (
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
        {projects.map((item, idx) => (
          <tr
            key={item.id}
            onClick={e => onProjectClickHandler(e, item)}
            // onDoubleClick={() => onProjectDoubleClickHandler(item)}
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

  return <>{ProjectsListContent}</>
}
