import { DetailedHTMLProps, FC, HTMLAttributes, ReactNode } from 'react'
import css from './SidebarBlockHeader.module.scss'

interface ISidebarBlockHeader extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  title: string
  children: ReactNode
}
export const SidebarBlockHeader: FC<ISidebarBlockHeader> = props => {
  const { children, title, ...rest } = props
  return (
    <>
      <div className={css.header} {...rest}>
        {title}
        {children}
      </div>
    </>
  )
}
