import { Route, Routes, Navigate } from 'react-router-dom'
import React, { FC } from 'react'
import { useAppSelector } from '../hooks/redux'
import { LoginPage } from '../pages/LoginPage'
import { ProjectsPage } from '../pages/ProjectsPage'
import { ProjectOverviewPage } from '../pages/ProjectOverviewPage'
import { Layout } from '../layout/Layout'
import { GraphPage } from '../pages/GraphPage'
import { ReelsPage } from '../pages/ReelsPage'

export const AppRouter: FC = () => {
  const authUser = useAppSelector(state => state.auth.authUser)

  return authUser && authUser.token ? (
    <Routes>
      <Route path={'/*'} element={<Layout />}>
        <Route path={'projects'} element={<ProjectsPage />} />
        <Route path={'project/:id/overview'} element={<ProjectOverviewPage />} />
        <Route path={'project/:id/graph'} element={<GraphPage />} />
        <Route path={'project/:id/reels/*'} element={<ReelsPage />} />
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
