import { BrowserRouter } from 'react-router-dom'
import { FC, Suspense } from 'react'
import AppRouter from './AppRouter'
import AppStyles from './App.styles'
import { ThemeProvider } from 'styled-components'
import { useAppSelector } from '../hooks/redux'
import './App.css'

const App: FC = () => {
  const theme = useAppSelector(state => state.ui.theme)

  return (
    <Suspense fallback={<div>loading...</div>}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <AppStyles />
          <AppRouter />
        </ThemeProvider>
      </BrowserRouter>
    </Suspense>
  )
}

export default App
