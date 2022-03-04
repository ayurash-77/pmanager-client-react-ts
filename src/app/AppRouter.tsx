import { Route, Routes, Navigate } from 'react-router-dom'
import React, { FC } from 'react'
import { useAppSelector } from '../hooks/redux'
import LoginPage from '../pages/LoginPage'
import ProjectsPage from '../pages/ProjectsPage'
import ProjectOverviewPage from '../pages/ProjectOverviewPage'
import { Layout } from '../layout/Layout'
import Test from '../pages/Test'

const AppRouter: FC = () => {
  const authUser = useAppSelector(state => state.auth.authUser)

  return authUser && authUser.token ? (
    <Routes>
      <Route path={'/test/*'} element={<Test />} />
      <Route path={'/*'} element={<Layout />}>
        <Route path={'projects'} element={<ProjectsPage />} />
        <Route path={'project/:id/*'} element={<ProjectOverviewPage />} />
        <Route path={'*'} element={<Navigate replace to={'projects'} />} />
      </Route>
    </Routes>
  ) : (
    <Routes>
      <Route path={'/auth/login'} element={<LoginPage />} />
      <Route path={'/*'} element={<Navigate replace to={'/auth/login'} />} />
    </Routes>
  )
}
export default AppRouter
