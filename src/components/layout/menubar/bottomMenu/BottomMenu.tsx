import { FC, useState } from 'react'
import * as SideIcons from '../../../../assets/icons/menubar-icons'
import UserSettingsModal from '../../../../entities/users/UserSettingsModal'
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux'
import { useTranslate } from '../../../../hooks/useTranslate'
import { setActiveProjectId } from '../../../../store/reducers/entities.reducer'
import { setQuarterFilter } from '../../../../store/reducers/projects.reducer'
import { logout } from '../../../../store/reducers/user.reducer'
import { MenuItem } from '../menuItem/MenuItem'
import { IMenuItem } from '../menuItem/menuItem.interfaces'

export const BottomMenu: FC = () => {
  const { text } = useTranslate()
  const { authUser } = useAppSelector(state => state.auth)
  const { quarterFilter } = useAppSelector(state => state.projects)
  const { expanded: menubarExpanded } = useAppSelector(state => state.ui.menubar)
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
    <div className={'flex flex-col justify-end'}>
      <UserSettingsModal
        isOpen={isUserSettingsModalShow}
        closeAction={() => setUserSettingsModalShow(false)}
      />
      {bottomMenuButtons.map((item, index) => (
        <MenuItem
          menubarExpanded={menubarExpanded}
          key={index}
          onClick={item.onClick}
          name={item.name}
          icon={item.icon}
          count={item.count}
        />
      ))}
    </div>
  )
}
