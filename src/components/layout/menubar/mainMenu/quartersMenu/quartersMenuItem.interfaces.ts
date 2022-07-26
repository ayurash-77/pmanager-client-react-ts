import { DetailedHTMLProps, HTMLAttributes } from 'react'

export interface IQuartersMenuItem extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  isSelected?: boolean
  menubarExpanded?: boolean
  quarter?: string
  count?: number
}
