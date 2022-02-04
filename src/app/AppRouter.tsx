import { Route, Routes, Navigate } from 'react-router-dom'
import React, { FC } from 'react'
import { useAppSelector } from '../hooks/redux'
import LoginPage from '../pages/LoginPage'
import ProjectsPage from '../pages/ProjectsPage'

export enum RouteNames {
  LOGIN = '/auth/login',
  PROJECTS = '/projects',
}

interface IRoute {
  path: string
  element: JSX.Element
}

const publicRoutes: IRoute[] = [{ path: RouteNames.LOGIN, element: <LoginPage /> }]
const privateRoutes: IRoute[] = [{ path: RouteNames.PROJECTS, element: <ProjectsPage /> }]

const AppRouter: FC = () => {
  const authUser = useAppSelector(state => state.auth.authUser)

  return authUser && authUser.token ? (
    <Routes>
      {privateRoutes.map(route => (
        <Route path={route.path} element={route.element} key={route.path} />
      ))}
      <Route path="/auth/login" element={<Navigate replace to={RouteNames.PROJECTS} />} />
      <Route path="/" element={<Navigate replace to={RouteNames.PROJECTS} />} />
    </Routes>
  ) : (
    <Routes>
      {publicRoutes.map(route => (
        <Route path={route.path} element={route.element} key={route.path} />
      ))}
      <Route path="/*" element={<Navigate replace to={RouteNames.LOGIN} />} />
    </Routes>
  )
}
export default AppRouter
