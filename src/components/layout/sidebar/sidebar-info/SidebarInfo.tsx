import { FC, useState } from 'react'
import * as ToolbarIcons from '../../../../assets/icons/toolbar-icons'
import { useTranslate } from '../../../../hooks/useTranslate'
import { IProject } from '../../../../interfaces/IProject'
import { InfoProjectBlock } from '../../../info-elements'
import { IconButton, Loader } from '../../../ui'
import css from '../Sidebar.module.scss'
import { SidebarBlockHeader } from '../sidebar-block-header/SidebarBlockHeader'

interface ISidebarInfo {
  project: IProject | null
  isLoadingProject?: boolean
}

export const SidebarInfo: FC<ISidebarInfo> = ({ project, isLoadingProject }) => {
  const { text } = useTranslate()
  const [isProjectSettingsModalShow, setProjectSettingsModalShow] = useState(false)

  return (
    <>
      <SidebarBlockHeader title={text.menu.projectInfo}>
        <IconButton icon={<ToolbarIcons.Gear />} ml={10} onClick={() => setProjectSettingsModalShow(true)} />
      </SidebarBlockHeader>
      <div className={css.blockContainer}>
        {!project && isLoadingProject ? <Loader size={32} /> : <InfoProjectBlock {...project} />}
      </div>
    </>
  )
}
export default SidebarInfo
