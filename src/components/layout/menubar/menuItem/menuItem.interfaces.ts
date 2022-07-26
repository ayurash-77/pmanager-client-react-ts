import { DetailedHTMLProps, HTMLAttributes } from 'react'

export interface IMenuItem extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  icon: JSX.Element
  name: string
  count?: number | JSX.Element
  isSelected?: boolean
  menubarExpanded?: boolean
  link?: string
}
