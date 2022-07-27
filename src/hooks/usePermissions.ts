import { useAppSelector } from './redux'

export const usePermissions = () => {
  const { authUser } = useAppSelector(state => state.auth)

  const canCreateProjectRoles = [
    'Producer',
    'Art director',
    'Manager',
    '2d artist',
    '3d artist',
    'CG generalist',
  ]
  const canEditProjectRoles = [
    'Producer',
    'Art director',
    'Manager',
    '2d artist',
    '3d artist',
    'CG generalist',
  ]
  const canDeleteProjectRoles = ['Producer', 'Art director', 'Manager']

  const canCreateProject = authUser.isAdmin || canCreateProjectRoles.includes(authUser.role.name)
  const canEditProject = authUser.isAdmin || canEditProjectRoles.includes(authUser.role.name)
  const canDeleteProject = authUser.isAdmin || canDeleteProjectRoles.includes(authUser.role.name)

  return { canCreateProject, canEditProject, canDeleteProject }
}
