import * as s from './Sidebar.styles'
import { useTranslate } from '../../hooks/useTranslate'
import { IProject } from '../../interfaces/IProject'
import { FC, useState } from 'react'
import Loader from '../../components/ui/Loader'
import { InfoProjectBlock } from '../../components/info-elements'
import * as ToolbarIcons from '../../assets/icons/toolbar-icons'
import { IconButton } from '../../components/ui'

interface ISidebarInfo {
  project: IProject | null
  isFetchingProject?: boolean
}
export const SidebarProjectInfo: FC<ISidebarInfo> = ({ project, isFetchingProject }) => {
  const { text } = useTranslate()
  const [isProjectSettingsModalShow, setProjectSettingsModalShow] = useState(false)

  return (
    <>
      <s.SidebarBlockTitle>
        {text.menu.projectInfo}
        <IconButton icon={<ToolbarIcons.Gear />} ml={10} onClick={() => setProjectSettingsModalShow(true)} />
      </s.SidebarBlockTitle>
      <s.SidebarBlockContainer>
        {!project && isFetchingProject ? <Loader size={32} /> : <InfoProjectBlock {...project} />}
      </s.SidebarBlockContainer>
    </>
  )
}
export default SidebarProjectInfo
