import { Route, Routes, Navigate } from 'react-router-dom'
import React, { FC } from 'react'
import { useAppSelector } from '../hooks/redux'
import { LoginPage } from '../pages/Login/LoginPage'
import { ProjectsPage } from '../pages/Projects/ProjectsPage'
import { Layout } from '../layout/Layout'
import { GraphPage } from '../pages/Graph/GraphPage'
import { ReelsPage } from '../pages/Reels/ReelsPage'

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
