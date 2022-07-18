import { FC, useState } from 'react'
import * as ToolbarIcons from '../../assets/icons/toolbar-icons'
import { InfoProjectBlock } from '../../components/info-elements'
import { IconButton, Loader } from '../../components/ui'
import { useTranslate } from '../../hooks/useTranslate'
import { IProject } from '../../interfaces/IProject'
import * as s from './Sidebar.styles'

interface ISidebarInfo {
  project: IProject | null
  isLoadingProject?: boolean
}

export const SidebarProjectInfo: FC<ISidebarInfo> = ({ project, isLoadingProject }) => {
  const { text } = useTranslate()
  const [isProjectSettingsModalShow, setProjectSettingsModalShow] = useState(false)

  return (
    <>
      <s.SidebarBlockTitle>
        {text.menu.projectInfo}
        <IconButton icon={<ToolbarIcons.Gear />} ml={10} onClick={() => setProjectSettingsModalShow(true)} />
      </s.SidebarBlockTitle>
      <s.SidebarBlockContainer>
        {!project && isLoadingProject ? <Loader size={32} /> : <InfoProjectBlock {...project} />}
      </s.SidebarBlockContainer>
    </>
  )
}
export default SidebarProjectInfo
