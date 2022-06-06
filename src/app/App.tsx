import { BrowserRouter } from 'react-router-dom'
import { FC } from 'react'
import { ReactQueryDevtools } from 'react-query/devtools'
import { QueryClientProvider, QueryClient } from 'react-query'
import { AppRouter } from './AppRouter'
import './styles/app.styles.scss'

const App: FC = () => {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
      <ReactQueryDevtools position={'bottom-left'} />
    </QueryClientProvider>
  )
}

export default App
