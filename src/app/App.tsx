import { FC } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { AppRouter } from './AppRouter'
import './styles/app.styles.scss'

const App: FC = () => {
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  )
}

export default App
