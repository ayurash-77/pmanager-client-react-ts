import { Button, FlexColumn, Grid, Input, Loader, Spacer } from '../../components/ui'
import { FC, useEffect, useState } from 'react'
import { useTranslate } from '../../hooks/useTranslate'
import { ErrorList } from '../../components/errors/ErrorList'
import { useLoginMutation } from '../../store/api/auth.api'
import { useAppDispatch } from '../../hooks/redux'
import { setAuthUser } from '../../store/reducers/user.reducer'

export const LoginForm: FC = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { text } = useTranslate()

  const [login, { data: user, isLoading, isError, error }] = useLoginMutation()

  const dispatch = useAppDispatch()

  const onSubmitHandler = async e => {
    e.preventDefault()
    await login({ username, password })
  }

  const onChangeUsernameHandler = e => {
    const val = e.target.value !== '' ? e.target.value : ''
    setUsername(val)
  }
  const onChangePasswordHandler = e => {
    const val = e.target.value !== '' ? e.target.value : ''
    setPassword(val)
  }

  useEffect(() => {
    if (user && user.token) {
      dispatch(setAuthUser(user))
    }
  }, [dispatch, user])

  return (
    <>
      <form onSubmit={onSubmitHandler}>
        <Grid cols={'auto'}>
          <FlexColumn gap={5}>
            <Input
              width={'100%'}
              variant={'normal'}
              placeholder={text.user.username}
              value={username}
              onChange={onChangeUsernameHandler}
              autoFocus={true}
            />
            <Input
              width={'100%'}
              variant={'normal'}
              type={'password'}
              placeholder={text.user.password}
              value={password}
              onChange={onChangePasswordHandler}
            />
          </FlexColumn>
          <Spacer height={30} />
          <Button variant={'normal'} width={'100%'}>
            {text.actions.enter}
          </Button>
        </Grid>
      </form>

      <FlexColumn>
        {isLoading && <Loader size={32} />}
        {isError && <ErrorList error={error} />}
      </FlexColumn>
    </>
  )
}
