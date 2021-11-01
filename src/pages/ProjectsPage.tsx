import { FC } from 'react'
import { Menubar } from '../components/menubar/Menubar'
import { MainMenu } from '../components/menubar/MainMenu'
import { Mainbar } from '../components/mainbar/Mainbar'
import { useLocalStorage } from '../hooks/useLocalStorage'

const ProjectsPage: FC = () => {
  const [isMenubarExpanded, setValue] = useLocalStorage(true, 'isMenubarExpanded')
  const toggleMenubarExpandHelper = () => {
    setValue(!isMenubarExpanded)
  }

  return (
    <>
      <Menubar toggle={toggleMenubarExpandHelper} isMenubarExpanded={isMenubarExpanded}>
        <MainMenu isMenubarExpanded={isMenubarExpanded} />
      </Menubar>
      <Mainbar />
    </>
  )
}

export default ProjectsPage
