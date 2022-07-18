import { IUserAuth } from 'interfaces/IUserAuth'
import { FC, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useLoginMutation } from 'store/api/auth.api'
import { setAuthUser } from 'store/reducers/user.reducer'
import { useAppDispatch } from 'hooks/redux'
import { useTranslate } from 'hooks/useTranslate'
import { ErrorList } from 'components/errors/ErrorList'
import { Button, FlexColumn, Grid, Loader, Spacer } from 'components/ui'

export const LoginForm: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<IUserAuth>({ mode: 'onChange' })

  const { text } = useTranslate()
  const [login, { data: user, isLoading, isError, error }] = useLoginMutation()
  const dispatch = useAppDispatch()

  const onSubmit = async (data: IUserAuth) => {
    await login(data)
  }

  useEffect(() => {
    if (user && user.token) {
      dispatch(setAuthUser(user))
    }
  }, [dispatch, user])

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid cols={'auto'}>
          <FlexColumn gap={5}>
            <input
              placeholder={text.user.username}
              autoComplete={'false'}
              {...register('username', { required: text.error.isRequired })}
              autoFocus={true}
            />
            <input
              placeholder={text.user.password}
              {...register('password', { required: text.error.isRequired })}
              type={'password'}
            />
          </FlexColumn>
          <Spacer height={30} />
          <Button variant={'normal'} width={'100%'} type="submit" disabled={!isValid}>
            {text.actions.enter}
          </Button>
        </Grid>
      </form>

      <FlexColumn>
        {isLoading && <Loader size={32} />}
        {isError && <ErrorList error={error} />}
        {errors?.username && (
          <div className={'error'}>
            {text.user.username}: {text.error.isRequired}
          </div>
        )}
        {errors?.password && (
          <div className={'error'}>
            {text.user.password}: {text.error.isRequired}
          </div>
        )}
      </FlexColumn>
    </>
  )
}
