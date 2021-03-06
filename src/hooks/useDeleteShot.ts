import React, { Dispatch, ReactElement, SetStateAction, useEffect, useState } from 'react'
import { useDeleteShotMutation } from '../store/api/shots.api'
import { ErrorList } from '../components/errors/ErrorList'
import { IShot } from '../interfaces/IShot'
import { useAppDispatch, useAppSelector } from './redux'
import { setActiveShotId } from '../store/reducers/entities.reducer'
import { useTranslate } from './useTranslate'
import { useGetReelsByProjectIdQuery } from '../store/api/reels.api'
import { IProject } from '../interfaces/IProject'

interface IUseDeleteShot {
  isDeleteModalShow: boolean
  setDeleteModalShow: Dispatch<SetStateAction<boolean>>
  canDeleteItem: boolean
  cancelDeleteShotHandler: () => void
  deleteShotHandler: (e) => void
  errorJsx: unknown
  title: string
}

export const useDeleteShot = (project: IProject, activeShot: IShot | null): IUseDeleteShot => {
  const { text } = useTranslate()
  const dispatch = useAppDispatch()
  const [deleteShot, { error, isSuccess, reset }] = useDeleteShotMutation()

  const { refetch: refetchReels } = useGetReelsByProjectIdQuery(project?.id)
  const errorJsx = ErrorList(error && 'data' in error ? error.data.message : [])

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
    errorJsx,
    title,
  }
}
