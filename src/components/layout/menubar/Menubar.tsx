import cn from 'classnames'
import { FC, ReactNode } from 'react'
import { useAppDispatch, useAppSelector } from '../../../hooks/redux'
import { setMenubarExpanded } from '../../../store/reducers/ui.reducer'
import css from './Menubar.module.scss'
import { BottomMenu } from './bottomMenu/BottomMenu'

export const Menubar: FC<{ children: ReactNode }> = ({ children }) => {
  const { expanded: menubarExpanded } = useAppSelector(state => state.ui.menubar)
  const dispatch = useAppDispatch()
  return (
    <div className={cn(css.container, menubarExpanded && css.expanded)}>
      {children}
      <div
        className={cn(css.toggle, menubarExpanded && css.expanded)}
        onClick={() => dispatch(setMenubarExpanded(!menubarExpanded))}
      />
      <BottomMenu />
    </div>
  )
}
