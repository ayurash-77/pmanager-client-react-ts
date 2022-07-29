import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react'
import { IReelsType } from '../../../entities/reelsTypes/reelsTypes.interfaces'
import { IEntityType } from '../../ui/ui.types'

export interface IRibbonWrapper extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children?: ReactNode
  variant: IEntityType
  reels?: IReelsType[]
  title: string
  count: number
  onClickPlus: () => void
  onClickMinus: () => void
  // showContextMenu?: (e) => void
  activeItemsIds: number[]
}
