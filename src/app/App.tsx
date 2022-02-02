import { BrowserRouter } from 'react-router-dom'
import { FC, Suspense, useEffect } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import AppRouter from './AppRouter'

const App: FC = () => {
  const [theme] = useLocalStorage('dark', 'theme')

  useEffect(() => {
    document.body.setAttribute('data-theme', theme)
  }, [theme])

  return (
    <Suspense fallback={<div>loading...</div>}>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </Suspense>
  )
}

export default App
