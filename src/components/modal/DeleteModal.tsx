import { SerializedError } from '@reduxjs/toolkit'
import { FC } from 'react'
import { IReel } from '../../interfaces/IReel'
import { IReelsType } from '../../interfaces/IReelsType'
import { IShot } from '../../interfaces/IShot'
import { CustomError } from '../../store/api/auth.api'
import { ErrorList } from '../errors/ErrorList'
import { Grid } from '../ui'
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
        <Grid cols="auto" gap={5}>
          <>
            {detailsJsx}
            <ErrorList error={error} />
          </>
        </Grid>
      </ModalWrapper>
    </>
  )
}

export default DeleteBriefModal
