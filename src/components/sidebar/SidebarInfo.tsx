import * as s from './Sidebar.styles'
import { useTranslate } from '../../hooks/useTranslate'
import { IProject } from '../../interfaces/IProject'
import { FC, useState } from 'react'
import Loader from '../ui/Loader'
import {
  InfoAgency,
  InfoBrand,
  InfoClient,
  InfoDeadline,
  InfoOwner,
  InfoProgress,
  InfoProjectBlock,
  InfoProjectTitle,
  InfoStartAt,
  InfoStatus,
} from '../info-elements/InfoElements'
import * as ie from '../info-elements/InfoElements.styles'
import * as ToolbarIcons from '../../assets/icons/toolbar-icons'
import { Button16 } from '../ui/Button16'

interface ISidebarInfo {
  project: IProject | null
  isFetching?: boolean
}
export const SidebarInfo: FC<ISidebarInfo> = ({ project, isFetching }) => {
  const { text } = useTranslate()
  const [isProjectSettingsModalShow, setProjectSettingsModalShow] = useState(false)

  return (
    <>
      <s.Title>
        {text.menu.projectInfo}
        <Button16
          icon={<ToolbarIcons.Gear />}
          marginLeft={10}
          onClick={() => setProjectSettingsModalShow(true)}
        />
      </s.Title>
      <s.SidebarBlockContainer>
        {isFetching ? <Loader size={32} /> : <InfoProjectBlock {...project} />}
      </s.SidebarBlockContainer>
    </>
  )
}
export default SidebarInfo
