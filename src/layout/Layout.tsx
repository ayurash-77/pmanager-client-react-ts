import { Menubar } from './Menubar'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { Footer } from './Footer'
import { Header } from './Header'
import { Sidebar } from './Sidebar'
import { MainMenu } from '../components/menubar/MainMenu'
import { FunctionComponent, ReactNode } from 'react'
import { LayoutContainer } from './Layout.styles'

interface LayoutProps {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps): JSX.Element => {
  const [isMenubarExpanded, setValue] = useLocalStorage(true, 'isMenubarExpanded')
  const [sidebarShow, setSidebarShow] = useLocalStorage(true, 'sidebarShow')
  const toggleMenubarExpandHelper = () => {
    setValue(!isMenubarExpanded)
  }
  const toggleSidebarShowHelper = () => {
    setSidebarShow(!sidebarShow)
  }

  return (
    <LayoutContainer sidebarShow={sidebarShow}>
      <Menubar toggle={toggleMenubarExpandHelper} isMenubarExpanded={isMenubarExpanded} className="menubar">
        <MainMenu isMenubarExpanded={isMenubarExpanded} />
      </Menubar>

      <div className={'mainbar'}>
        <Header sidebarShow={sidebarShow} toggle={toggleSidebarShowHelper} className={'header'} />
        <div className="body">{children}</div>
        <Footer className={'footer'} />
      </div>

      <Sidebar sidebarShow={sidebarShow} className={'sidebar'} />
    </LayoutContainer>
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
