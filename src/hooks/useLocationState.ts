import { useLocation } from 'react-router'

export const useLocationState = () => {
  const { state } = useLocation()
  const isProjectsState = state !== 1
  const isProjectState = state === 1
  return { state, isProjectsState, isProjectState }
}
