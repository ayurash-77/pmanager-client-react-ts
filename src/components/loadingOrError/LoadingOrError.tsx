import { SerializedError } from '@reduxjs/toolkit'
import { FC } from 'react'
import { CustomError } from '../../store/base.api'
import { ErrorList } from '../errors/ErrorList'
import { Loader } from '../ui'

interface ILoadingOrError {
  isLoading: boolean
  isError: boolean
  error: SerializedError | CustomError
}

export const LoadingOrError: FC<ILoadingOrError> = props => {
  const { isLoading, isError, error } = props

  const infoBox = (
    <div className={'flex flex-col mt-2'}>
      {isLoading && <Loader size={24} />}
      {isError && <ErrorList error={error} />}
    </div>
  )
  return (isLoading || isError) && infoBox
}
