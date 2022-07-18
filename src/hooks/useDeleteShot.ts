import { SerializedError } from '@reduxjs/toolkit'
import { skipToken } from '@reduxjs/toolkit/query'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { IProject } from '../interfaces/IProject'
import { IShot } from '../interfaces/IShot'
import { CustomError } from '../store/api/auth.api'
import { useGetReelsQuery } from '../store/api/reels.api'
import { useDeleteShotMutation } from '../store/api/shots.api'
import { setActiveShotId } from '../store/reducers/entities.reducer'
import { useAppDispatch, useAppSelector } from './redux'
import { useTranslate } from './useTranslate'

interface IUseDeleteShot {
  isDeleteModalShow: boolean
  setDeleteModalShow: Dispatch<SetStateAction<boolean>>
  canDeleteItem: boolean
  cancelDeleteShotHandler: () => void
  deleteShotHandler: (e) => void
  error: SerializedError | CustomError
  title: string
}

export const useDeleteShot = (project: IProject, activeShot: IShot | null): IUseDeleteShot => {
  const { text } = useTranslate()
  const dispatch = useAppDispatch()
  const [deleteShot, { error, isSuccess, reset }] = useDeleteShotMutation()

  const { refetch: refetchReels } = useGetReelsQuery(project?.id ?? skipToken)

  const [isDeleteModalShow, setDeleteModalShow] = useState<boolean>(false)
  const { activeShotId } = useAppSelector(state => state.entities)

  const { authUser } = useAppSelector(state => state.auth)
  const canDeleteItemRoles = ['Art director', 'Manager']
  const canDeleteItem = authUser.isAdmin || canDeleteItemRoles.includes(authUser.role.name)

  const title = `${text.actions.deleteShot} ${activeShot?.code}?`

  const deleteShotHandler = e => {
    e.preventDefault()
    deleteShot(activeShotId)
  }

  const cancelDeleteShotHandler = () => {
    reset()
    setDeleteModalShow(false)
  }

  useEffect(() => {
    if (isSuccess) {
      setDeleteModalShow(false)
      dispatch(setActiveShotId(null))
      reset()
      refetchReels()
    }
  }, [dispatch, isSuccess, refetchReels, reset])

  //////////////////////////////////////////////////

  return {
    isDeleteModalShow,
    setDeleteModalShow,
    canDeleteItem,
    cancelDeleteShotHandler,
    deleteShotHandler,
    error,
    title,
  }
}
