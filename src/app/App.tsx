import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Redirect } from 'react-router'
import { FC, Suspense } from 'react'
import LoginPage from '../pages/LoginPage'
import ProjectsPage from '../pages/ProjectsPage'

const App: FC = () => {
  return (
    <Suspense fallback={<div>loading...</div>}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ProjectsPage} />
          <Route exact path="/login" component={LoginPage} />
          <Redirect to="/login" />
        </Switch>
      </BrowserRouter>
    </Suspense>
  )
}

export default App
