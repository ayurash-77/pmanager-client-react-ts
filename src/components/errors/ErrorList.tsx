import { SerializedError } from '@reduxjs/toolkit'
import { FC } from 'react'
import { CustomError } from '../../entities/users/auth/auth.api'

interface IErrorList {
  error: SerializedError | CustomError
}

export const ErrorList: FC<IErrorList> = ({ error }) => {
  if (!error) return null
  const errors = error && 'data' in error ? error.data.message : []
  const iterable = typeof errors === 'object'
  return iterable ? (
    <div>
      {errors.map((item, index) => (
        <div className="error" key={index}>
          {item}
        </div>
      ))}
    </div>
  ) : (
    <div className="error">{errors}</div>
  )
}
