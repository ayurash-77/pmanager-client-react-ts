import { useLoginMutation } from 'entities/users/auth/auth.api'
import { IUserInputData } from 'entities/users/users.interfaces'
import { FC, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { setAuthUser } from 'store/reducers/user.reducer'
import { useAppDispatch } from 'hooks/redux'
import { useTranslate } from 'hooks/useTranslate'
import { ErrorList } from 'components/errors/ErrorList'
import { Button, FlexColumn, Loader } from 'components/ui'

export const LoginForm: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<IUserInputData>({ mode: 'onChange' })

  const { text } = useTranslate()
  const [login, { data: user, isLoading, isError, error }] = useLoginMutation()
  const dispatch = useAppDispatch()

  const onSubmit = async (data: IUserInputData) => {
    await login(data)
  }

  useEffect(() => {
    if (user && user.token) {
      dispatch(setAuthUser(user))
    }
  }, [dispatch, user])

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className={'flex justify-center'}>
        <div className={'flex flex-col gap-1.5'}>
          <div>
            <input
              placeholder={text.user.username}
              autoComplete={'false'}
              autoFocus={true}
              {...register('username', { required: text.error.isRequired })}
            />
            {errors?.username && <div className={'errorField col-start-1'}>{text.error.fieldRequired}</div>}
          </div>

          <div>
            <input
              placeholder={text.user.password}
              type={'password'}
              {...register('password', { required: text.error.isRequired })}
            />
            {errors?.password && <div className={'errorField col-start-1'}>{text.error.fieldRequired}</div>}
          </div>

          <div style={{ height: 30, width: 10 }} />
          <Button width={'100%'} type="submit" disabled={!isValid}>
            {text.actions.enter}
          </Button>
        </div>
      </form>

      <FlexColumn>
        {isLoading && <Loader size={32} />}
        {isError && <ErrorList error={error} />}
      </FlexColumn>
    </>
  )
}
