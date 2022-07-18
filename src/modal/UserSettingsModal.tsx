import axios from 'axios'
import { FC, useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router'
import { ErrorList } from '../components/errors/ErrorList'
import { Box, FlexColumn, Grid, Input, InputImage } from '../components/ui'
import { UploadingProgress } from '../components/uploading-progress/UploadingProgress'
import { apiBaseUrl, apiUploadUrl } from '../constants/env'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { useTranslate } from '../hooks/useTranslate'
import { IUser } from '../interfaces/IUser'
import { useUpdateUserMutation } from '../store/api/users.api'
import { setAuthUser } from '../store/reducers/user.reducer'
import { ModalWrapper } from './ModalWrapper'

interface IUserSettingsModal {
  isOpen: boolean
  closeAction: () => void
}

//
// UserSettingsModal
//

export const UserSettingsModal: FC<IUserSettingsModal> = ({ closeAction, ...props }) => {
  const { id } = useParams()
  const { text } = useTranslate()
  // const authUser = useAppSelector(state => state.auth.authUser)
  const user = useAppSelector(state => state.auth.authUser)
  // const { data: user } = useGetUserByIdQuery(authUser.id)

  const dispatch = useAppDispatch()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [url, setUrl] = useState(`${apiBaseUrl}/${user?.image}`)
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [message, setMessage] = useState(null)
  const [waiting, setWaiting] = useState(false)
  const [userData, setUserData] = useState<IUser>({ ...user })

  const token = useAppSelector(state => state.auth.authUser.token)
  const [updateUser, { isError, error, isSuccess, reset, data: updatedUser }] = useUpdateUserMutation()

  const controller = new AbortController()
  const formData = new FormData()

  // const imageSrc = `${apiBaseUrl}/${user.image}`

  const deleteFile = async () => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
        data: { url: user.image },
      }
      setWaiting(true)
      await axios.delete(`${apiBaseUrl}/files`, config)
    } catch (error) {
      //
    }
  }

  const clearData = async () => {
    formData.append('file', null)
    setUploading(false)
    setUrl(`${apiBaseUrl}/${user.image}`)

    reset()
    setWaiting(false)
    setMessage(null)
    setUserData({ ...user })
  }

  const onChangeHandler = (key, target) => {
    setUserData({ ...userData, [key]: target.value })
  }

  const fileSelectedHandler = async e => {
    await clearData()
    const file = e.target.files[0]
    setUrl(null)

    if (file) {
      formData.append('file', e.target.files[0])
      setUploading(true)
      setWaiting(true)
    }

    try {
      const options = {
        headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${token}` },
        onUploadProgress: e => {
          const { loaded, total } = e
          const percent = Math.floor((loaded * 100) / total)
          if (percent < 100) setProgress(percent)
        },
        signal: controller.signal,
      }

      const { data } = await axios.post(`${apiUploadUrl}/userImage`, formData, options)
      setUrl(`${apiBaseUrl}/${data.url}`)
      setUserData({ ...userData, image: data.url })
    } catch (error) {
      //console.log('ERROR: ', error)
    }
    setWaiting(false)
    setUploading(false)
  }

  const onCancelHandler = async e => {
    e.preventDefault()
    setUrl(`${apiBaseUrl}/${user.image}`)
    setUserData({ ...user })
    closeAction()
  }

  const onSubmitHandler = async e => {
    e.preventDefault()
    await updateUser({ ...userData })
  }

  useEffect(() => {
    setUserData(user)
    // setUrl(`${apiBaseUrl}/${user?.image}`)
    if (isSuccess) {
      setUserData({ ...updatedUser })
      dispatch(setAuthUser(updatedUser))
      reset()
      closeAction()
    }
  }, [closeAction, dispatch, isSuccess, reset, updatedUser, user])

  ////////////////////////////////////////////////////////////////////////////////////////////

  ////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <>
      <ModalWrapper
        {...props}
        warning={false}
        type={'type1'}
        size={'md'}
        title={text.app.userProfile}
        onSubmitHandler={onSubmitHandler}
        onCancelHandler={onCancelHandler}
      >
        <Grid cols="auto" gap={5} align={'center'}>
          <input style={{ display: 'none' }} type="file" onChange={fileSelectedHandler} ref={fileInputRef} />
          <Box>
            <InputImage
              rad={'50%'}
              width={'120px'}
              height={'120px'}
              onClick={() => fileInputRef.current.click()}
              isUploading={uploading}
              url={url}
              isBrowse={!uploading}
            />
          </Box>

          <UploadingProgress uploading={uploading} progress={progress} withValue={true} />
          <div style={{ textAlign: 'center' }}>{message}</div>

          <div>
            <FlexColumn vAlign="center" padding={5}>
              {isError && <ErrorList error={error} />}
            </FlexColumn>
          </div>
          <Grid cols="auto" gap={5}>
            <Grid cols="max-content auto " marginTop={5} align={'right'}>
              <Input
                label={text.user.username}
                onChange={e => onChangeHandler('username', e.target)}
                value={userData?.username}
                autoFocus={true}
              />
              <Input
                label={text.user.email}
                onChange={e => onChangeHandler('email', e.target)}
                value={userData?.email}
              />
              <Input
                label={text.user.firstName}
                onChange={e => onChangeHandler('name', e.target)}
                value={userData?.name}
              />
              <Input
                label={text.user.secondName}
                onChange={e => onChangeHandler('surname', e.target)}
                value={userData?.surname}
              />
              <Input
                label={text.user.phone}
                onChange={e => onChangeHandler('phone', e.target)}
                value={userData?.phone}
              />
            </Grid>
          </Grid>
        </Grid>
      </ModalWrapper>
    </>
  )
}

export default UserSettingsModal
