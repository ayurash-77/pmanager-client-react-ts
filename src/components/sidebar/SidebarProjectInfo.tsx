import * as s from './Sidebar.styles'
import { useTranslate } from '../../hooks/useTranslate'
import { IProject } from '../../interfaces/IProject'
import { FC, useState } from 'react'
import Loader from '../ui/Loader'
import { InfoProjectBlock } from '../info-elements'
import * as ToolbarIcons from '../../assets/icons/toolbar-icons'
import { IconButton } from '../ui'

interface ISidebarInfo {
  project: IProject | null
  isFetching?: boolean
}
export const SidebarProjectInfo: FC<ISidebarInfo> = ({ project, isFetching }) => {
  const { text } = useTranslate()
  const [isProjectSettingsModalShow, setProjectSettingsModalShow] = useState(false)

  return (
    <>
      <s.SidebarBlockTitle>
        {text.menu.projectInfo}
        <IconButton icon={<ToolbarIcons.Gear />} ml={10} onClick={() => setProjectSettingsModalShow(true)} />
      </s.SidebarBlockTitle>
      <s.SidebarBlockContainer>
        {isFetching ? <Loader size={32} /> : <InfoProjectBlock {...project} />}
      </s.SidebarBlockContainer>
    </>
  )
}
export default SidebarProjectInfo
