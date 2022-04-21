import * as s from './Sidebar.styles'
import { useTranslate } from '../../hooks/useTranslate'
import { IProject } from '../../interfaces/IProject'
import { FC, useState } from 'react'
import Loader from '../../components/ui/Loader'

import * as CommonIcons from '../../assets/icons/common-icons'
import { toDateStr } from '../../tools/date-time-format'
import axios from 'axios'
import NewBriefModal from '../../modal/NewBriefModal'
import DeleteBriefModal from '../../modal/DeleteBriefModal'
import { IconButton, Table } from '../../components/ui'
import { apiBaseUrl } from '../../constants/env'

interface ISidebarBriefs {
  project: IProject | null
  isFetchingProject?: boolean
}
export const SidebarBriefs: FC<ISidebarBriefs> = ({ project, isFetchingProject }) => {
  const { text } = useTranslate()
  const [isNewBriefModalShow, setNewBriefModalShow] = useState(false)
  const [isDeleteBriefModalShow, setDeleteBriefModalShow] = useState(false)
  const [selectedBrief, setSelectedBrief] = useState(null)

  const onDeleteBriefModalShowHandler = brief => {
    setSelectedBrief(brief)
    setDeleteBriefModalShow(true)
  }

  const onBriefClickHandler = async item => {
    const url = `${apiBaseUrl}/root/${item.url}`
    const filename = url.split('/').pop()
    await axios({
      url,
      method: 'GET',
      // responseType: 'blob', // important
    }).then(response => {
      const url1 = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url1
      link.setAttribute('download', `${filename}`)
      document.body.appendChild(link)
      link.click()
    })
  }

  const projectBriefsBody = (
    <Table>
      <thead>
        <tr>
          <th> </th>
          <th>{text.brief.name}</th>
          <th>{text.brief.createdAt}</th>
          <th>{text.brief.category}</th>
        </tr>
      </thead>
      <tbody>
        {project.briefs?.map(brief => (
          <tr key={brief.id} className="hover">
            <td>
              <IconButton
                icon={<CommonIcons.Minus />}
                size={12}
                ml={-5}
                variant={'accent'}
                onClick={() => onDeleteBriefModalShowHandler(brief)}
              />
            </td>
            <td className="link" onClick={() => onBriefClickHandler(brief)}>
              {brief.name}
            </td>
            <td className="date">{toDateStr(brief.createdAt)}</td>
            <td className="info">{brief.category.name}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  )

  return (
    <>
      <NewBriefModal
        isOpen={isNewBriefModalShow}
        closeAction={() => setNewBriefModalShow(false)}
        project={project}
      />
      <DeleteBriefModal
        isOpen={isDeleteBriefModalShow}
        closeAction={() => setDeleteBriefModalShow(false)}
        brief={selectedBrief}
      />
      <s.SidebarBlockTitle>
        {text.menu.briefs}
        <IconButton icon={<CommonIcons.Plus />} ml={10} onClick={() => setNewBriefModalShow(true)} />
      </s.SidebarBlockTitle>
      <s.SidebarBlockContainer>
        {!project && isFetchingProject ? (
          <Loader size={32} />
        ) : (
          project.briefs?.length > 0 && projectBriefsBody
        )}
      </s.SidebarBlockContainer>
    </>
  )
}
export default SidebarBriefs
