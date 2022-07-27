import { DetailedHTMLProps, FC, HTMLAttributes, ReactNode } from 'react'
import css from './ToolButtonGroup.module.scss'

interface IToolButtonGroup extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children: ReactNode
}

export const ToolButtonGroup: FC<IToolButtonGroup> = ({ children }) => {
  return <div className={css.container}>{children}</div>
}
