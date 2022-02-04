import { Menubar } from './Menubar'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { Footer } from './Footer'
import { Header } from './Header'
import { Sidebar } from './Sidebar'
import { MainMenu } from '../components/menubar/MainMenu'
import { FC, FunctionComponent, ReactNode } from 'react'
import styled from 'styled-components'

interface ILayout {
  children: ReactNode
}

const Container = styled.div`
  transition: color 250ms;
  display: flex;
  width: 100vw;
  .mainbar {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
  .body {
    z-index: 1;
    padding: 10px;
    height: 100%;
    overflow: auto;
  }
`

const Layout: FC<ILayout> = ({ children }) => {
  const [isMenubarExpanded, setValue] = useLocalStorage(true, 'isMenubarExpanded')
  const [sidebarShow, setSidebarShow] = useLocalStorage(true, 'sidebarShow')
  const toggleMenubarExpandHelper = () => {
    setValue(!isMenubarExpanded)
  }
  const toggleSidebarShowHelper = () => {
    setSidebarShow(!sidebarShow)
  }

  return (
    <Container>
      <Menubar toggle={toggleMenubarExpandHelper} isMenubarExpanded={isMenubarExpanded}>
        <MainMenu isMenubarExpanded={isMenubarExpanded} />
      </Menubar>

      <div className={'mainbar'}>
        <Header sidebarShow={sidebarShow} onClick={toggleSidebarShowHelper} />
        <div className="body">{children}</div>
        <Footer />
      </div>

      <Sidebar sidebarShow={sidebarShow} />
    </Container>
  )
}

export const withLayout = <T extends Record<string, unknown>>(Component: FunctionComponent<T>) => {
  return function withLayoutComponent(props: T): JSX.Element {
    return (
      <Layout>
        <Component {...props} />
      </Layout>
    )
  }
}
