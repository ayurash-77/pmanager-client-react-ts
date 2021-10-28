import { FC, useState } from 'react'
import { Translate } from 'react-redux-i18n'
import { MenuItem } from './MenuItem'

import * as SideIcons from '../../assets/icons/menubar-icons'

interface Props {
  isMenubarExpanded: boolean
}

export const MainMenu: FC<Props> = ({ isMenubarExpanded }) => {
  const [selectedMenuItem, setSelectedMenuItem] = useState<string>('allProjects')
  const handleMenuItemClick = (name: string) => {
    setSelectedMenuItem(name)
    console.log(selectedMenuItem)
  }

  return (
    <>
      <MenuItem
        onClick={() => handleMenuItemClick('allProjects')}
        icon={<SideIcons.Home />}
        name={<Translate value="menu.allProjects" />}
        count={11}
        isSelected={selectedMenuItem === 'allProjects'}
        isMenubarExpanded={isMenubarExpanded}
      />
    </>
  )
}
