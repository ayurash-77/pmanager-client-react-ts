import { FormEventHandler, MouseEventHandler } from 'react'

export type IZIndex = 1000 | 1100 | 1200
export type IMode = 'create' | 'edit' | 'delete' | null

export interface IModal {
  isOpen: boolean
  mode: IMode
  zIndex?: IZIndex
}

export interface IModalWrapper {
  waiting?: boolean
  warning?: boolean
  isOpen: boolean
  type: 'type1' | 'type2'
  size: string
  title?: string
  onSubmitHandler: FormEventHandler<HTMLFormElement>
  onCancelHandler: MouseEventHandler<HTMLButtonElement>
  zIndex?: IZIndex
  mode?: IMode
  isValid?: boolean
}
