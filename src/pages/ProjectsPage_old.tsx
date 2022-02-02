import { FC } from 'react'
import { Menubar } from '../layout/Menubar'
import { MainMenu } from '../components/menubar/MainMenu'
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
    </>
  )
}

export default ProjectsPage
