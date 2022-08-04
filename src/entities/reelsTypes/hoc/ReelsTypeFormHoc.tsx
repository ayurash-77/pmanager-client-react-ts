import React, { FC } from 'react'
import { IMode } from '../../../components/modal/modalWrapper.interfaces'
import { useAppSelector } from '../../../hooks/redux'
import { useTranslate } from '../../../hooks/useTranslate'
import { IReelsType } from '../reelsTypes.interfaces'

export interface WrapperProps {
  mode: IMode
  reelsType?: IReelsType
}
export interface IComponent {
  mode: IMode
  title: string
  isOpen?: boolean
  reelsType?: IReelsType
}

export const ReelsTypeFormHoc = (Component: FC<IComponent>) => {
  return function WrapperComponent(props: WrapperProps) {
    const { text } = useTranslate()
    const { reelsTypeModal } = useAppSelector(state => state.modals)
    const title = props.mode === 'create' ? text.actions.addReelsType : text.actions.editReelsType
    const isOpen = reelsTypeModal.mode === props.mode && reelsTypeModal.isOpen
    return <Component title={title} isOpen={isOpen} {...props} />
  }
}
