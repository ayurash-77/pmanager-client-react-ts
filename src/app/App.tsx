import { ChakraProvider } from '@chakra-ui/react'
import { FC } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { AppRouter } from './AppRouter'
import './styles/app.styles.scss'

const App: FC = () => {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </ChakraProvider>
  )
}

export default App
