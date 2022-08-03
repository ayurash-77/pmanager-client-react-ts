import React, { FC } from 'react'
import { useTranslate } from 'hooks/useTranslate'
import { useAppSelector } from '../../../hooks/redux'
import { ReelsTypeForm } from '../../reels/modals/ReelsTypeForm'
import { IReelsType } from '../reelsTypes.interfaces'

////////////////////////////////////////////////////////////////////////////////////////////
// New ReelsType Modal
////////////////////////////////////////////////////////////////////////////////////////////

interface IEditReelsTypeModal {
  item: IReelsType
}

export const EditReelsTypeModal: FC<IEditReelsTypeModal> = ({ item: reelsType }) => {
  const { text } = useTranslate()

  const { reelsTypeModal } = useAppSelector(state => state.modals)
  const isOpen = reelsType && reelsTypeModal.mode === 'edit' && reelsTypeModal.isOpen

  ////////////////////////////////////////////////////////////////////////////////////////////

  ////////////////////////////////////////////////////////////////////////////////////////////

  return <ReelsTypeForm reelsType={reelsType} title={text.actions.editReelsType} isOpen={isOpen} />
}
