import React, { FC } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from '../components/layout/Layout'
import { useAppSelector } from '../hooks/redux'
import { GraphPage } from '../pages/GraphPage/GraphPage'
import { LoginPage } from '../pages/LoginPage/LoginPage'
import { ProjectsPage } from '../pages/ProjectsPage/ProjectsPage'
import { ReelsPage } from '../pages/ReelsPage/ReelsPage'

export const AppRouter: FC = () => {
  const authUser = useAppSelector(state => state.auth.authUser)

  return authUser && authUser.token ? (
    <Routes>
      <Route path={'/*'} element={<Layout />}>
        <Route path={'projects'} element={<ProjectsPage />} />
        <Route path={'projects/:id/graph'} element={<GraphPage />} />
        <Route path={'projects/:id/reels/*'} element={<ReelsPage />} />
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
