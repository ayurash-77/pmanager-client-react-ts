import { ModalWrapper } from './ModalWrapper'
import { FC } from 'react'
import { Grid } from '../components/ui'
import { IReel } from '../interfaces/IReel'
import { IReelsType } from '../interfaces/IReelsType'
import { IShot } from '../interfaces/IShot'

export interface IDeleteModal {
  isOpen: boolean
  closeAction: () => void
  deleteItem: IShot | IReel | IReelsType
  deleteAction: (e) => void
  detailsJsx?: JSX.Element
  errorJsx?: unknown
  title?: string
}

export const DeleteBriefModal: FC<IDeleteModal> = ({ ...props }) => {
  const { deleteAction, closeAction, errorJsx, detailsJsx, title } = props

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
            {errorJsx}
          </>
        </Grid>
      </ModalWrapper>
    </>
  )
}

export default DeleteBriefModal
