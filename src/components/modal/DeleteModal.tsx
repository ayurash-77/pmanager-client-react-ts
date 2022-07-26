import { SerializedError } from '@reduxjs/toolkit'
import { IReel } from 'entities/reels/reels.interfaces'
import { IReelsType } from 'entities/reelsTypes/reelsTypes.interfaces'
import { IShot } from 'entities/shots/shots.interfaces'
import { CustomError } from 'entities/users/auth/auth.api'
import { FC } from 'react'
import { ErrorList } from 'components/errors/ErrorList'
import { ModalWrapper } from './ModalWrapper'

export interface IDeleteModal {
  isOpen: boolean
  closeAction: () => void
  deleteItem: IShot | IReel | IReelsType
  deleteAction: (e) => void
  detailsJsx?: JSX.Element
  error?: SerializedError | CustomError
  title?: string
}

export const DeleteBriefModal: FC<IDeleteModal> = ({ ...props }) => {
  const { deleteAction, closeAction, error, detailsJsx, title } = props

  return (
    <>
      <ModalWrapper
        {...props}
        warning
        type={'type1'}
        size={'md'}
        title={`WARNING! ${title}`}
        onSubmitHandler={deleteAction}
        onCancelHandler={closeAction}
      >
        <div className={'flex'}>
          {detailsJsx}
          <ErrorList error={error} />
        </div>
      </ModalWrapper>
    </>
  )
}

export default DeleteBriefModal
