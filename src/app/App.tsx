import { FC, useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { AppRouter } from './AppRouter'
import './styles/app.styles.scss'

const App: FC = () => {
  useEffect(() => {
    document.addEventListener('contextmenu', e => e.preventDefault())
    return () => document.removeEventListener('contextmenu', e => e.preventDefault())
  }, [])

  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  )
}

export default App
