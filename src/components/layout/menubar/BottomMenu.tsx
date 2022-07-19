import { FC, useState } from 'react'
import styled from 'styled-components'
import * as SideIcons from '../../../assets/icons/menubar-icons'
import { useAppDispatch, useAppSelector } from '../../../hooks/redux'
import { useTranslate } from '../../../hooks/useTranslate'
import { setActiveProjectId } from '../../../store/reducers/entities.reducer'
import { setQuarterFilter } from '../../../store/reducers/projects.reducer'
import { logout } from '../../../store/reducers/user.reducer'
import UserSettingsModal from '../../modal/UserSettingsModal'
import { IMenuItem, MenuItem } from './MenuItem'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: auto;
  justify-content: flex-end;
`

export const BottomMenu: FC<Pick<IMenuItem, 'menubarExpanded'>> = props => {
  const { text } = useTranslate()
  const { authUser } = useAppSelector(state => state.auth)
  const { quarterFilter } = useAppSelector(state => state.projects)
  const dispatch = useAppDispatch()

  const [isUserSettingsModalShow, setUserSettingsModalShow] = useState(false)

  const handleLogout = () => {
    dispatch(setQuarterFilter({ ...quarterFilter, isActive: false }))
    dispatch(logout())
    dispatch(setActiveProjectId(null))
  }

  const bottomMenuButtons: IMenuItem[] = [
    { icon: <SideIcons.User />, name: authUser.username, onClick: () => setUserSettingsModalShow(true) },
    { icon: <SideIcons.Logout />, name: text.menu.logout, onClick: handleLogout },
    { icon: <SideIcons.Gear />, name: text.menu.settings },
  ]

  return (
    <Container>
      <UserSettingsModal
        isOpen={isUserSettingsModalShow}
        closeAction={() => setUserSettingsModalShow(false)}
      />
      {bottomMenuButtons.map((item, index) => (
        <MenuItem
          {...props}
          key={index}
          onClick={item.onClick}
          name={item.name}
          icon={item.icon}
          count={item.count}
        />
      ))}
    </Container>
  )
}
