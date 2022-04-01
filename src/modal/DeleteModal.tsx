import { ModalWrapper } from './ModalWrapper'
import { FC, useEffect, useState } from 'react'
import { useTranslate } from '../hooks/useTranslate'
import { Grid } from '../components/ui'
import { ErrorList } from '../components/errors/ErrorList'
import { IBrief } from '../interfaces/IBrief'
import { useDeleteBriefMutation } from '../store/api/briefs.api'
import { InfoBriefBlock } from '../components/info-elements'
import { useGetAllProjectsQuery } from '../store/api/projects.api'
import { IShot } from '../interfaces/IShot'
import { useDeleteShotMutation } from '../store/api/shots.api'
import { MutationTrigger } from '@reduxjs/toolkit/dist/query/react/buildHooks'
import { MutationDefinition } from '@reduxjs/toolkit/query'
import { BaseQueryFn, FetchArgs } from '@reduxjs/toolkit/query/react'
import { CustomError } from '../store/api/auth.api'
import { setActiveShotId } from '../store/reducers/entities.reducer'
import { SerializedError } from '@reduxjs/toolkit'
import { IReel } from '../interfaces/IReel'
import { IReelsType } from '../interfaces/IReelsType'

export interface IDeleteModal {
  isOpen: boolean
  closeAction: () => void
  deleteItem: IShot | IReel | IReelsType
  deleteAction: (e) => void
  errorJsx?: unknown
}

export const DeleteBriefModal: FC<IDeleteModal> = ({ ...props }) => {
  const { deleteItem, deleteAction, closeAction, errorJsx } = props
  const { text } = useTranslate()

  const details = deleteItem && (
    <div style={{ display: 'flex', columnGap: 10, flexWrap: 'wrap', justifyContent: 'space-evenly' }}>
      <div>deleteItem details: </div>
      <div>{deleteItem.code}</div>
    </div>
  )

  return (
    <>
      <ModalWrapper
        {...props}
        warning
        type={'type1'}
        size={'md'}
        title={text.actions.deleteBrief}
        onSubmitHandler={deleteAction}
        onCancelHandler={closeAction}
      >
        <Grid cols="auto" gap={5}>
          {details}
          {errorJsx}
        </Grid>
      </ModalWrapper>
    </>
  )
}

export default DeleteBriefModal
