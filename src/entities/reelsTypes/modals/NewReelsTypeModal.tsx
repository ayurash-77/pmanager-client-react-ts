import React, { FC } from 'react'
import { useTranslate } from 'hooks/useTranslate'
import { useAppSelector } from '../../../hooks/redux'
import { ReelsTypeForm } from '../../reels/modals/ReelsTypeForm'

////////////////////////////////////////////////////////////////////////////////////////////
// New ReelsType Modal
////////////////////////////////////////////////////////////////////////////////////////////

export const NewReelsTypeModal: FC = () => {
  const { text } = useTranslate()

  const { reelsTypeModal } = useAppSelector(state => state.modals)
  const isOpen = reelsTypeModal.mode === 'create' && reelsTypeModal.isOpen

  ////////////////////////////////////////////////////////////////////////////////////////////

  return <ReelsTypeForm title={text.actions.addReelsType} isOpen={isOpen} />
}
