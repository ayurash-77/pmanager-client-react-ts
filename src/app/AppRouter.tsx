import { Route, Switch } from 'react-router-dom'
import React, { FC } from 'react'
import { Redirect } from 'react-router'
import { useAppSelector } from '../hooks/redux'
import LoginPage from '../pages/LoginPage'
import ProjectsPage from '../pages/ProjectsPage'

export enum RouteNames {
  LOGIN = '/auth/login',
  PROJECTS = '/',
}

interface IRoute {
  path: string
  component: React.ComponentType
  exact?: boolean
}

const publicRoutes: IRoute[] = [{ path: RouteNames.LOGIN, exact: true, component: LoginPage }]
const privateRoutes: IRoute[] = [{ path: RouteNames.PROJECTS, exact: true, component: ProjectsPage }]

const AppRouter: FC = () => {
  const authUser = useAppSelector(state => state.auth.authUser)

  return authUser && authUser.token ? (
    <Switch>
      {privateRoutes.map(route => (
        <Route exact={route.exact} path={route.path} component={route.component} key={route.path} />
      ))}
      <Redirect to={RouteNames.PROJECTS} />
    </Switch>
  ) : (
    <Switch>
      {publicRoutes.map(route => (
        <Route exact={route.exact} path={route.path} component={route.component} key={route.path} />
      ))}
      <Redirect to={RouteNames.LOGIN} />
    </Switch>
  )
}
export default AppRouter
