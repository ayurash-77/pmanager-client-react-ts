import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Redirect } from 'react-router'
import { FC, Suspense, useEffect } from 'react'
import LoginPage from '../pages/LoginPage'
import ProjectsPage from '../pages/ProjectsPage'
import { useLocalStorage } from '../hooks/useLocalStorage'

const App: FC = () => {
  const [theme] = useLocalStorage('dark', 'theme')

  useEffect(() => {
    document.body.setAttribute('data-theme', theme)
  }, [theme])

  return (
    <Suspense fallback={<div>loading...</div>}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/users" component={ProjectsPage} />
          <Route exact path="/auth/login" component={LoginPage} />
          <Redirect to="/users" />
        </Switch>
      </BrowserRouter>
    </Suspense>
  )
}

export default App
