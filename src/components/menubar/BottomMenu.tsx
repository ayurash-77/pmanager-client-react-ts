import { FC, useState } from 'react'
import { MenuItem } from './MenuItem'

import * as SideIcons from '../../assets/icons/menubar-icons'

import { useTranslate } from '../../hooks/useTranslate'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { userSlice } from '../../store/userSlice'

interface Props {
  isMenubarExpanded: boolean
}

export const BottomMenu: FC<Props> = ({ isMenubarExpanded }) => {
  const [selectedMenuItem, setSelectedMenuItem] = useState<string>('allProjects')
  const { text } = useTranslate()
  const authUser = useAppSelector(state => state.auth.authUser)
  const { logout } = userSlice.actions
  const dispatch = useAppDispatch()

  const handleMenuItemClick = (name: string) => {
    setSelectedMenuItem(name)
  }

  const logoutHandler = () => {
    console.log('LOGOUT')
    dispatch(logout())
  }

  return (
    <>
      <MenuItem
        onClick={() => handleMenuItemClick(text.user.username)}
        icon={<SideIcons.User />}
        name={authUser.username}
        isSelected={false}
        isMenubarExpanded={isMenubarExpanded}
      />
      <MenuItem
        onClick={logoutHandler}
        icon={<SideIcons.Logout />}
        name={text.menu.logout}
        isSelected={false}
        isMenubarExpanded={isMenubarExpanded}
      />
      <MenuItem
        onClick={() => handleMenuItemClick(text.menu.settings)}
        icon={<SideIcons.Gear />}
        name={text.menu.settings}
        isSelected={false}
        isMenubarExpanded={isMenubarExpanded}
      />
    </>
  )
}
