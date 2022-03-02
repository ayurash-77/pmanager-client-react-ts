import { BrowserRouter } from 'react-router-dom'
import { FC, Suspense } from 'react'
import AppRouter from './AppRouter'
import './styles/app.styles.scss'

const App: FC = () => {
  return (
    <Suspense fallback={<div>loading...</div>}>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </Suspense>
  )
}

export default App
