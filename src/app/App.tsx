import { BrowserRouter } from 'react-router-dom'
import { FC } from 'react'
import { ReactQueryDevtools } from 'react-query/devtools'
import { QueryClientProvider, QueryClient } from 'react-query'
import { AppRouter } from './AppRouter'
// import { DndProvider } from 'react-dnd'
// import { HTML5Backend } from 'react-dnd-html5-backend'
import './styles/app.styles.scss'

const App: FC = () => {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      {/* <DndProvider backend={HTML5Backend}> */}
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
      {/* </DndProvider> */}
      <ReactQueryDevtools position={'bottom-left'} />
    </QueryClientProvider>
  )
}

export default App
