import axios from 'axios'
import { FC, useState } from 'react'
import { CommonIcons } from '../../../../assets/icons/common-icons'
import { apiBaseUrl } from '../../../../constants/env'
import DeleteBriefModal from '../../../../entities/briefs/DeleteBriefModal'
import NewBriefModal from '../../../../entities/briefs/NewBriefModal'
import { IBrief } from '../../../../entities/briefs/briefs.interfaces'
import { IProject } from '../../../../entities/projects/projects.interfaces'
import { useTranslate } from '../../../../hooks/useTranslate'
import { toDateStr } from '../../../../utils/date-time-format'
import { IconButton, Loader, Table } from '../../../ui'
import css from '../Sidebar.module.scss'
import { SidebarBlockHeader } from '../sidebar-block-header/SidebarBlockHeader'

interface ISidebarBriefs {
  project: IProject | null
  briefs: IBrief[]
  isLoadingBriefs?: boolean
}

export const SidebarBriefs: FC<ISidebarBriefs> = ({ project, briefs, isLoadingBriefs }) => {
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
        {briefs?.map(brief => (
          <tr key={brief.id} className="hover">
            <td>
              <IconButton
                icon={CommonIcons.minus()}
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
      <SidebarBlockHeader title={text.menu.briefs}>
        <IconButton icon={CommonIcons.plus()} ml={10} onClick={() => setNewBriefModalShow(true)} />
      </SidebarBlockHeader>
      <div className={css.blockContainer}>
        {isLoadingBriefs && <Loader size={32} />}
        {briefs?.length > 0 && projectBriefsBody}
      </div>
    </>
  )
}
export default SidebarBriefs
