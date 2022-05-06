import { useAppSelector } from './redux'

export const useAuth = () => {
  const { token } = useAppSelector(state => state.auth.authUser)
  const config = { headers: { Authorization: `Bearer ${token}` } }
  return { token, config }
}
